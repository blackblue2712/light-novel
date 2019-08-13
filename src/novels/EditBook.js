import React, { Component } from 'react';
import { getSingleBook, postUpdateBook } from '../controllers/book';
import { getAllCategories } from '../controllers/category';
import { isAuthenticated } from '../controllers/user';
import RightSide from './RightSide';
import Notification from '../components/Notification';


class EditBook extends Component {

    constructor() {
        super();
        this.state = {
            message: "",
            book: {},
            categories: [],
            cateId: [],
            name: "",
            description: "",
            price: 0,
            saleOff: 0,
            author: "",
            datePublished: null,
        }
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    async componentDidMount() {
        this.postData = new FormData();

        const bookId = this.props.match.params.bookId;
        
        await getSingleBook(bookId)
            .then( async data => {
                if(data.error) this.setState( {message: data.error})
                const { name, description, price, saleOff, author, datePublished, special, status } = data;
                const cateId = data.cateId.map( cate => cate._id);
                
                const categories = await getAllCategories();
                this.setState( {categories, name, description, price, saleOff, author, special, status, cateId } )

                if(datePublished != null) {
                    const stirngDate = new Date(datePublished).toLocaleDateString();
                    let day = stirngDate.split("/")[1];
                    if(day < 10) day = "0" + day;
                    let month = stirngDate.split("/")[0];
                    if(month < 10) month = "0" + month;
                    let year = stirngDate.split("/")[2];
                    this.setState( {datePublished: year + "-" + month + "-" + day} );
                }
            })

        
    }

    handleChange = (type) => {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.setState( {message: "Fetching ..."} );
        const bookId = this.props.match.params.bookId;
        const { name, description, price, saleOff, author, datePublished } = this.state;

        const status = document.getElementById("status").value;
        const special = document.getElementById("special").value;
        const selected = document.querySelectorAll("#cateId option:checked")
        const cateId = Array.from(selected).map( el => el.value);

        if(name !== '' && price !== '' && cateId.length > 0) {
            const userInfo = isAuthenticated();
            if(!userInfo) window.location = "/admin/signin";

            this.postData.set("name", name);
            this.postData.set("description", description);
            this.postData.set("price", price);
            this.postData.set("saleOff", saleOff);
            this.postData.set("author", author);
            this.postData.set("datePublished", datePublished);
            this.postData.set("status", status);
            this.postData.set("special", special);
            this.postData.set("selected", selected);
            this.postData.set("cateId", cateId);

            // console.log(this.postData.get("photo"));

            await postUpdateBook( this.postData, userInfo, bookId)
                .then( res => {
                    console.log(res);
                    if(res == undefined) {
                        this.setState( {message: "Fail to update"} )
                    } else if(res.error) {
                        this.setState( {message: res.error} )
                    } else {
                        this.setState ( {message: res.message} )
                    }
                })
        } else {
            this.setState( {message: "Name and price are required!"} )
        }
    }

    chooseImage = (e) => {
        document.getElementById("preview-image").style.display = "block";
        let reader = new FileReader();
        reader.onload = function () {
            let inputAvatar = document.getElementById('photo-preview');
            inputAvatar.src = reader.result;
        }
        reader.readAsDataURL(e.target.files[0]);
        this.postData.set("photo", e.target.files[0]);
    }

    render() {
        const { message, name, description, price, saleOff, author, datePublished, special, status, categories, cateId } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="Book">

                <div className="box box-primary" style={{"marginTop":"20px"}}>
                    <Notification  notification={message} classShow={classShow} deleteMessageAfterShow={this.deleteMessageAfterShow} />
                    <div className="col-md-12">
                        <form>
                            <div className="box-body">
                                <div className="form-group">
                                    <label htmlFor="Book" className="require">Book name</label>
                                    <input id="name" type="text" className="form-control"
                                        value={name}
                                        onChange={this.handleChange("name")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Book">Book description</label>
                                    <textarea id="description" type="text" className="form-control"
                                        value={description}
                                        onChange={this.handleChange("description")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="require">Price</label>
                                    <input id="price" type="number" className="form-control"
                                        value={price}
                                        onChange={this.handleChange("price")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="saleOff">Sale off (%)</label>
                                    <input id="saleOff" type="number" className="form-control"
                                        value={saleOff}
                                        onChange={this.handleChange("saleOff")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Author</label>
                                    <input id="author" type="text" className="form-control"
                                        value={author}
                                        onChange={this.handleChange("author")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="datePublished">Date published</label>
                                    <input id="datePublished" type="date" className="form-control"
                                        value={datePublished}
                                        onChange={this.handleChange("datePublished")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="special">Special</label>
                                    <select id="special" className="custom-select">
                                        {
                                            special == true ? <><option value="1">Special</option><option value="0">Normal</option></> : 
                                                              <><option value="0">Normal</option><option value="1">Special</option></>
                                        }
                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" className="custom-select">
                                        {
                                            status == true ? <><option value="1">Active</option><option value="0">Inactive</option></> :
                                                             <><option value="0">Inactive</option><option value="1">Avtive</option></>
                                        }
                                        
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cateId" className="require">Category</label>
                                    <select multiple id="cateId" className="custom-select" style={{height: 200}}>
                                        {categories.map( (cate, index) => {
                                            return cateId.indexOf(cate._id) !== -1 ? <option selected key={index} value={cate._id}>{cate.name}</option>
                                                                                   : <option key={index} value={cate._id}>{cate.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <button type="button" className="button-choose-image" id="button-choose-image"
                                        style={{background: "transparent", "border": "none", cursor: "pointer", display: "flex", alignItems: "center" }}
                                        onClick={() => document.getElementById("photo").click()}
                                    >
                                        <i className="material-icons" style={{fontSize: 40}}>photo_library</i> Choose image
                                    </button>
                                    <input type="file" id="photo" name="photo"
                                        style={{display: "none"}}
                                        onChange={this.chooseImage}
                                    />
                                </div>
                                <div className="preview-image" id="preview-image" style={{display: "none", marginBottom: 40}}>
                                    <img src="" alt="" id="photo-preview" className="photo-preview" style={{height: 100}}/>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" style={{color: "#f9f9f9"}} onClick={this.handleSubmit}/>
                            </div>
                        </form>
                    </div>
                </div>
            </RightSide>
        )
    }
}

export default EditBook;