import React, { Component } from 'react';
import RightSide from '../components/RightSide';
import Notification from '../components/Notification';
import { getSingleGroup, updateGroup } from '../controllers/group';
import  { isAuthenticated } from '../controllers/user';

class SingleUser extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            name: "",
            description: "",
            groupACP: false,
            status: true,
            _id: ''
        }
    }

    async componentDidMount() {
        const groupId = this.props.match.params.groupId;
        const group = await getSingleGroup(groupId);
        console.log(group)
        const { name, description, groupACP, status, _id } = group;
        this.setState( { name, description, groupACP, status, _id } );
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
        const groupACP = document.getElementById("groupACP").value;
        const { name, description, _id } = this.state;
        if(name !== '') {
            updateGroup( { _id, name, description, groupACP, status }, token)
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
        const { message, name, description, groupACP, status } = this.state;
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
                                        <label htmlFor="name" className="require">Group name</label>
                                        <input id="name" type="text" className="form-control"
                                            value={name}
                                            onChange={this.handleChange("name")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="description">Description</label>
                                        <input id="description" type="text" className="form-control"
                                            value={description}
                                            onChange={this.handleChange("description")}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Group ACP</label>
                                       <select id="groupACP" className="custom-select">
                                            <option value="1">Allowed</option>
                                            <option value="0">Not allowed</option>
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="status">Status</label>
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
                </div>
            </RightSide>
        )
    }
}

export default SingleUser;