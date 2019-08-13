import React, { Component } from 'react';
import RightSide from '../components/RightSide';
import Notification from '../components/Notification';
import { getSingleUser, isAuthenticated, updateUser } from '../controllers/user';
import  { getGroups } from '../controllers/group';
import { Link } from 'react-router-dom';

class SingleUser extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            groups: [],
            username: "",
            email: "",
            fullname: "",
            status: true,
            group: null,
            _id: ''
        }
    }

    async componentDidMount() {
        const userId = this.props.match.params.userId;
        const user = await getSingleUser(userId);
        const groups = await getGroups();
        const { username, email, fullname, _id } = user;
        this.setState( {username, email, fullname, _id, groups} );
    }

    handleChange = (type) => {
        return (e) => {
            this.setState({
                [type]: e.target.value
            })
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const token = isAuthenticated().token;
        const status = document.getElementById("status").value;
        const groupId = document.getElementById("group").value;
        const { username, email, fullname, _id } = this.state;
        if(username !== '') {
            updateUser( { _id, username, email, fullname, status, groupId }, token)
                .then( res => {
                    console.log(res)
                    this.setState( {message: res.message} )
                })
        }
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }
    
    render() {
        const { message, username, email, fullname, groups } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="User">
                <div className="row">
                    <div className="box box-primary" style={{"marginTop":"20px"}}>
                        <Notification  notification={message} classShow={classShow} deleteMessageAfterShow={this.deleteMessageAfterShow} />
                        <div className="col-md-12">
                            <form>
                                <div className="box-body">
                                    <div className="form-group">
                                        <label htmlFor="category" className="require">User name</label>
                                        <input id="name" type="text" className="form-control"
                                            value={username}
                                            onChange={this.handleChange("username")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Email</label>
                                        <input id="email" type="text" className="form-control"
                                            value={email}
                                            onChange={this.handleChange("email")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Fullname</label>
                                        <input id="fullname" type="text" className="form-control"
                                            value={fullname}
                                            onChange={this.handleChange("fullname")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
                                        <select id="status" className="custom-select">
                                            <option value="1">Active</option>
                                            <option value="0">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                    <label htmlFor="group">Group</label>
                                        <select id="group" className="custom-select">
                                           {groups.map( (gr, index) => {
                                               return <option key={index} value={gr._id}>{gr.name}</option>
                                           })}
                                        </select>
                                    </div>
                                </div>
                                <input type="submit" className="btn btn-primary" value="Submit" style={{color: "#f9f9f9"}}
                                    onClick={this.handleSubmit}
                                />
                            </form>
                        </div>
                    </div>
                </div>
            </RightSide>
        )
    }
}

export default SingleUser;