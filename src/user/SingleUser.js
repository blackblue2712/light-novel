import React, { Component } from 'react';
import RightSide from '../components/RightSide';
import Notification from '../components/Notification';
import { getSingleUser, isAuthenticated, updateUser, updatePassword } from '../controllers/user';
import  { getGroups } from '../controllers/group';
import { Link } from 'react-router-dom';
import "./SingleUser.css";

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
            groupId: null,
            _id: ''
        }
    }

    async componentDidMount() {
        this.postData = new FormData();
        const userId = this.props.match.params.userId;
        const user = await getSingleUser(userId);
        const groups = await getGroups();
        const { username, email, fullname, _id, groupId } = user;
        this.setState( {groupId, username, email, fullname, _id, groups} );
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
        const token = isAuthenticated().token;
        const userInfo = isAuthenticated();
        const status = document.getElementById("status").value;
        const groupId = document.getElementById("groupId").value;
        const { username, email, fullname, _id } = this.state;
        const userId = this.props.match.params.userId;

        // Check if change password
        const checkboxPassword = document.getElementById("isChangePassword");
        console.log(checkboxPassword.checked);
        if(checkboxPassword.checked) {
            console.log("change pass...");
            const password = document.getElementById("password").value;
            updatePassword(userId, password, token, userInfo)
                .then( res => {
                    console.log(res)
                    this.setState( {message: res.message} )
                })
        }

        if(username !== '') {
            this.postData.set("username", username);
            this.postData.set("fullname", fullname);
            this.postData.set("email", email);
            this.postData.set("status", status);
            this.postData.set("groupId", groupId);
            this.postData.set("_id", _id);
            updateUser( this.postData, token)
                .then( res => {
                    console.log(res)
                    this.setState( {message: res.message} )
                })
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

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    handleShowChangePassword = e => {
        if(e.target.checked === true) {
            document.getElementById("box-change").classList.add("show-change-password");
            document.getElementById("box-change").classList.remove("hide-change-password");
        } else {
            document.getElementById("box-change").classList.remove("show-change-password");
            document.getElementById("box-change").classList.add("hide-change-password");
        }
    }

    
    render() {
        const { message, username, email, fullname, groups, groupId } = this.state;
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
                                        <select id="groupId" className="custom-select">
                                           {groups.map( (gr, index) => {
                                               return groupId._id === gr._id ? <option key={index} value={gr._id} selected>{gr.name}</option>
                                                                        : <option key={index} value={gr._id}>{gr.name}</option>
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
                                </div>

                                <div className="my-4">
                                    <label htmlFor="isChangePassword">Click here to change password</label>
                                    <input type="checkbox" name="isChangePassword" className="form-control" id="isChangePassword" 
                                        style={{display: "none"}}
                                        onClick={this.handleShowChangePassword}
                                    />
                                    <div className="hide-change-password" id="box-change">
                                        {/* <label htmlFor="password">Current password</label>
                                        <input type="password" className="form-control" name="currentPassword" id="currentPassword" /> */}
                                        <label htmlFor="password" className="text-success">New password</label>
                                        <input type="password" className="form-control" name="password" id="password" />
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