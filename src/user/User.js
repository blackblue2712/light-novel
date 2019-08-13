import React, { Component } from 'react';
import RightSide from '../components/RightSide';
import Notification from '../components/Notification';
import { getUsers, getMoreUsers } from '../controllers/user';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            users: []
        }
    }

    async componentDidMount() {
        const users = await getUsers();
        this.setState( {users} );
    }

    loadMore = async () => {
        document.getElementById("loadmore").style.display = "none";
        const lengthUsers = this.state.users.length;
        getMoreUsers(lengthUsers)
            .then( res => {
                if(res.message) {
                    this.setState( {message: res.message} )
                } else {
                    const newUsers = this.state.users;
                    newUsers.push(...res);
                    if(newUsers.length === lengthUsers) {
                        document.getElementById("loadmore").style.display = "none";
                    } else {
                        document.getElementById("loadmore").style.display = "block";
                        this.setState({
                            books: newUsers
                        })
                    }
                }
            })
    }
    
    render() {
        const { message, users } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="User">
                <div className="row" style={{width: "100%"}}>
                    <Notification  notification={message} classShow={classShow} />
                    <table className="table" style={{"marginTop": "30px", width: "100%"}}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th style={{width: 400}} scope="col">Name</th>
                                <th scope="col">Sattus</th>
                                <th scope="col">Email</th>
                                <th scope="col">Fullname</th>
                                <th scope="col">Group</th>
                                <th scope="col">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map( (user, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{++index}</th>
                                        <td><Link to={`/admin/user/${user._id}`}>{user.username}</Link></td>
                                        <td>{user.status === 0 ? "Inactive" : "Active"}</td>
                                        <td>{user.email}</td>
                                        <td>{user.fullname}</td>
                                        <td><Link to={`/admin/group/${user.groupId._id}`}>{user.groupId.name}</Link></td>
                                        <td>{user.groupId.description}</td>
                                    </tr>
                                )  
                            })}
                            
                        </tbody>
                    </table>
                    <input type="button" id="loadmore" className="btn btn-outline-primary btn-block btn-sm" value="Lore More" onClick={this.loadMore}></input>
                </div>
            </RightSide>
        )
    }
}

export default User;