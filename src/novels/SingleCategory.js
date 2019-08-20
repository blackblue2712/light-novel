import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import RightSide from './RightSide';
import { postUpdateCategory, getSingleCate } from '../controllers/category';
import { isAuthenticated } from '../controllers/user';
import Notification from '../components/Notification';

class SingleCategory extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            name: "",
            description: "",
            status: true
        }
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    handleSubmit = (e) => { 
        e.preventDefault();
        const { name, description, _id } = this.state;
        const status = document.getElementById("status").value;
        
        if(name !== '') {
            e.preventDefault();
            const userInfo = isAuthenticated();
            if(!userInfo) window.location = "/admin/signin";
            postUpdateCategory({name, description, status, _id}, userInfo)
                .then( res => {
                    if(res.error) {
                        this.setState( {message: res.error} );
                    } else {
                        this.setState( {message: res.message} );
                    }
                })
        }
    }

    handleChange = (type) => {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    componentDidMount() {
        const cateId = this.props.match.params.cateId;
        getSingleCate(cateId)
            .then( res => {
                if(res !== undefined) {
                    if(res.error) {
                        this.setState( {message: res.error} );   
                    } else {
                        this.setState( {
                            name: res.name,
                            description: res.description,
                            status: res.status,
                            _id: res._id   
                        });
                    }
                }
            })
    }

    render() {
        const { message, name, description, status } = this.state;
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
                                    <input id="name" type="text" className="form-control"
                                        value={name}
                                        onChange={this.handleChange("name")}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="category">Category description</label>
                                    <input id="description" type="text" className="form-control"
                                        value={description}
                                        onChange={this.handleChange("description")}
                                    />
                                </div>
                                <div className="form-group">
                                    <select id="status" className="custom-select">
                                        {
                                            status == true ? <><option value="1">Active</option><option value="0">Inactive</option></>
                                                                    : <><option value="0">Inactive</option><option value="1">Active</option></>
                                        }
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

export default SingleCategory;