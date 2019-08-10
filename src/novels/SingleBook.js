import React, { Component } from 'react';
import { getSingleBook } from '../controllers/book';
import { isAuthenticated } from '../controllers/user';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import Notification from '../components/Notification';
import { crawlChapter, getContentFromCrawlLinks, postAddChapter, getChapters } from '../controllers/chapter';


class SingleBook extends Component {

    constructor() {
        super();
        this.state = {
            message: "",
            book: {},
            chapters: []
        }
    }

    componentDidMount() {
        const bookId = this.props.match.params.bookId;
        getSingleBook(bookId)
            .then( data => {
                if(data.error) this.setState( {message: data.error})
                this.setState( {book: data} )
            })
        getChapters(bookId)
            .then( data => {
                if(data.error) this.setState( {message: data.error})
                this.setState( {chapters: data, message: `${data.length} chapters loaded`} )
            })
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState( {message: "Fetching ..."} );
        const token = isAuthenticated().token;
        const userId = isAuthenticated().user._id;
        const bookId = this.props.match.params.bookId;
        const crawlURL = document.getElementById("crawlURL").value;
        let crawlNumbersFrom = document.getElementById("sliceNumberFrom").value;
        let crawlNumbersTo = document.getElementById("sliceNumberTo").value;

        if(!crawlNumbersFrom) crawlNumbersFrom = 0;
        if(!crawlNumbersTo) crawlNumbersTo = 3;
        const titlesAndLinks = await crawlChapter(crawlURL, {crawlNumbersFrom, crawlNumbersTo}, token)

        const titles = titlesAndLinks.titles.map( tt => tt.replace(/<\/br>\s/g, "-"))
        
        console.log(titlesAndLinks)
        if(titlesAndLinks.error) {
            this.setState( {message:titlesAndLinks.error} )
        } else {
            this.setState( {message: "Crawled " + titlesAndLinks.links.length + " links"} );
            const data = await getContentFromCrawlLinks(titlesAndLinks.links);
            console.log(data)
            if(data.error) {
                this.setState( {message: "Error occur, please try again!"} );
            } else {
                postAddChapter(data, titles, bookId, userId, token)
                    .then( res => {
                        console.log(res)
                        if(res === undefined) {
                            this.setState( {message: "Fail! please decrease number of pages to crawl"} );
                        } else {
                            this.setState( {message: res.message} );
                        } 
                    })
            }
        }
    }

    render() {
        const { message, book, chapters } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="Book">
                <div className="row">
                    <div className="main-button text-center" style={{"marginTop": "30px", width: "100%"}}>
                        {/* <Link className="btn btn-app" to={`/admin/book/create/`} >
                            <i className="fa fa-plus"></i>
                        </Link> */}
                    </div>
                </div>

                <div className="box box-primary" style={{"marginTop":"20px"}}>
                    <Notification  notification={message} classShow={classShow} />
                    <div className="col-md-12">
                        <form>
                            <div className="box-body">
                                <div className="form-group">
                                    <label htmlFor="category" className="nameBook">{book.name}</label>
                                    <input id="crawlURL" type="text" className="form-control" placeholder="Enter URL" style={{fontSize: "14px"}}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sliceNumber" className="">Number of pages to crawl from (0 are default)</label>
                                    <input id="sliceNumberFrom" type="number" className="form-control" style={{fontSize: "14px"}}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="sliceNumber" className="">Number of pages to crawl to (3 are default)</label>
                                    <input id="sliceNumberTo" type="number" className="form-control" style={{fontSize: "14px"}}/>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" style={{color: "#f9f9f9"}}
                                    onClick={this.handleSubmit}
                                />
                            </div>
                        </form>
                    </div>
                </div>
                <div className="box box-danger" style={{"marginTop":"50px"}}>

                    <div className="box-body">
                        <div className="form-group">
                            <label htmlFor="category" className="nameBook" style={{marginBottom: "1rem"}}>Chapters ({chapters.length})</label>
                            {chapters.map( (ct, index) => {
                                return <p key={index}>
                                    <Link to={`/admin/chapter/${ct._id}`}>
                                        <small><i style={{fontWeight:545, fontFamily: "sans"}}>{ct.chapterNumber}</i></small>
                                    </Link>
                                </p>
                            })}
                        </div>
                    </div>
                </div>
            </RightSide>
        )
    }
}

export default SingleBook;