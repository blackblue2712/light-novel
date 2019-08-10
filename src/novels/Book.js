import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { isAuthenticated } from '../controllers/user';
import  { getBooks } from '../controllers/book';

class Book extends Component {
    constructor() {
        super();
        this.state = {
            books: []
        }
    }

    async componentDidMount() {
        const books = await getBooks();
        console.log(books)
        this.setState( {books} );
    }

    render() {
        const _id = isAuthenticated().user._id;
        const { books } = this.state;
        if(!_id) window.location = "/admin/signin";
        return (
            <RightSide name="Book">
                <div className="row">
                    <div className="main-button text-center" style={{"marginTop": "30px", width: "100%"}}>
                        <Link className="btn btn-app" to={`/admin/book/create/${_id}`} >
                            <i className="fa fa-plus"></i>
                        </Link>
                        {/* <Link className="btn btn-app" >
                            <i className="fa fa-check"></i>
                        </Link>
                        <Link className="btn btn-app" >
                            <i className="fa fa-circle-o"></i>
                        </Link>
                        <Link role="delete" id="delete" className="btn btn-app deleteMulti" >
                            <i className="fa fa-minus"></i>
                        </Link>*/}
                    </div>
                </div>

                <table className="table" style={{"marginTop": "30px", width: "100%"}}>
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th style={{width: 400}} scope="col">Name</th>
                            <th scope="col">Sattus</th>
                            <th scope="col">Price</th>
                            <th scope="col">SaleOff(%)</th>
                            <th scope="col">Category</th>
                            <th scope="col">Created</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map( (book, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">{++index}</th>
                                    <td><Link to={`/admin/book/${book._id}`}>{book.name}</Link></td>
                                    <td>{book.status === 0 ? "Inactive" : "Active"}</td>
                                    <td>{book.price}</td>
                                    <td>{book.saleOff}</td>
                                    <td>{book.cateId.name}</td>
                                    <td>{new Date(book.created).toLocaleDateString()}</td>
                                </tr>
                            )  
                        })}
                        
                    </tbody>
                </table>
            </RightSide>
            
        )
    }
}

export default Book;