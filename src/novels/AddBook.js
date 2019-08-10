import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { getCategories } from '../controllers/category';
import { postAddbook } from '../controllers/book'; 
import { isAuthenticated } from '../controllers/user';
import Notification from '../components/Notification';

class AddBook extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            categories: []
        }
    }

    async componentDidMount() {
        const categories = await getCategories();
        this.setState( {categories} );
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const name = document.getElementById("name").value;
        const status = document.getElementById("status").value;
        const description = document.getElementById("description").value;
        const special = document.getElementById("special").value;
        const price = document.getElementById("price").value;
        const saleOff = document.getElementById("saleOff").value;
        const author = document.getElementById("author").value;
        const datePublished = document.getElementById("datePublished").value;
        const cateId = document.getElementById("cateId").value;
        console.log(name, status, description, special, price, saleOff, author, datePublished, cateId)
        if(name !== '' && price !== '') {
            const userInfo = isAuthenticated();
            if(!userInfo) window.location = "/admin/signin";
            postAddbook( {name, description, status, special, price, saleOff, author, datePublished, cateId}, userInfo)
                .then( res => {
                    console.log(res);
                    if(res.error) {
                        this.setState( {message: res.error} )
                    } else {
                        this.setState ( {message: res.message} )
                    }
                })
        } else {
            this.setState( {message: "Name and price are required!"} )
        }
    }

    render() {
        const { message, categories } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="Book">
                <div className="row">
                    <div className="main-button text-center" style={{"marginTop": "30px", width: "100%"}}>
                        <Link to="/admin/book" className="btn btn-app" >
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                    </div>
                </div>

                <div className="box box-primary" style={{"marginTop":"20px"}}>
                    <Notification  notification={message} classShow={classShow} />
                    <div className="col-md-12">
                        <form>
                            <div className="box-body">
                                <div className="form-group">
                                    <label htmlFor="Book" className="require">Book name</label>
                                    <input id="name" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="Book">Book description</label>
                                    <input id="description" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price" className="require">Price</label>
                                    <input id="price" type="number" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="saleOff">Sale off (%)</label>
                                    <input id="saleOff" type="number" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="author">Author</label>
                                    <input id="author" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="datePublished">Date published</label>
                                    <input id="datePublished" type="date" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="special">Special</label>
                                    <select id="special" className="custom-select">
                                        <option value="0">Normal</option>
                                        <option value="1">Special</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="status">Status</label>
                                    <select id="status" className="custom-select">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cateId" className="require">Category</label>
                                    <select id="cateId" className="custom-select">
                                        {categories.map( (cate, index) => {
                                            return <option key={index} value={cate._id}>{cate.name}</option>
                                        })}
                                    </select>
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

export default AddBook;