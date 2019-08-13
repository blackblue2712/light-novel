import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { postAddCate } from '../controllers/category';
import { isAuthenticated } from '../controllers/user';
import Notification from '../components/Notification';

class AddCategory extends Component {
    constructor() {
        super();
        this.state = {
            message: ""
        }
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    handleSubmit = (e) => { 
        e.preventDefault();
        const name = document.getElementById("name").value;
        const description = document.getElementById("description").value;
        const status = document.getElementById("status").value;
        
        if(name !== '') {
            e.preventDefault();
            const userInfo = isAuthenticated();
            if(!userInfo) window.location = "/admin/signin";
            postAddCate({name, description, status}, userInfo)
                .then( res => {
                    if(res.error) {
                        this.setState( {message: res.error} );
                    } else {
                        this.setState( {message: res.message} );
                    }
                })
        }
    }

    render() {
        const message = this.state.message;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="Category">
                <div className="row">
                    <div className="main-button text-center" style={{"marginTop": "30px", width: "100%"}}>
                        <Link to="/admin/category" className="btn btn-app" >
                            <i className="fa fa-arrow-left"></i>
                        </Link>
                    </div>
                </div>

                <div className="box box-primary" style={{"marginTop":"20px"}}>
                    <Notification  notification={message} classShow={classShow} deleteMessageAfterShow={this.deleteMessageAfterShow} />
                    <div className="col-md-12">
                        <form>
                            <div className="box-body">
                                <div className="form-group">
                                    <label htmlFor="category" className="require">Category name</label>
                                    <input id="name" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category description</label>
                                    <input id="description" type="text" className="form-control"/>
                                </div>
                                <div className="form-group">
                                    <select id="status" className="custom-select">
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                            </div>
                            <input type="submit" className="btn btn-primary" value="Submit" style={{color: "#f9f9f9"}}
                                onClick={this.handleSubmit}
                            />
                        </form>
                    </div>
                </div>
            </RightSide>
        )
    }
}

export default AddCategory;