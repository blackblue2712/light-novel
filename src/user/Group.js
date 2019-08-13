import React, { Component } from 'react';
import RightSide from '../components/RightSide';
import Notification from '../components/Notification';
import { getGroups, getMoreGroups } from '../controllers/group';
import { Link } from 'react-router-dom';

class User extends Component {
    constructor() {
        super();
        this.state = {
            message: "",
            groups: []
        }
    }

    async componentDidMount() {
        const groups = await getGroups();
        this.setState( {groups} );
    }

    deleteMessageAfterShow = () => {
        this.setState( {message: ''});
    }

    loadMore = async () => {
        document.getElementById("loadmore").style.display = "none";
        const lengthGroups = this.state.groups.length;
        await getMoreGroups(lengthGroups)
            .then( res => {
                if(res.message) {
                    this.setState( {message: res.message} )
                } else {
                    const newGroups = this.state.groups;
                    newGroups.push(...res);
                    if(newGroups.length === lengthGroups) {
                        document.getElementById("loadmore").style.display = "none";
                    } else {
                        document.getElementById("loadmore").style.display = "block";
                        this.setState({
                            groups: newGroups
                        })
                    }
                }
            })
    }
    
    render() {
        const { message, groups } = this.state;
        const classShow = message !== "" ? "slideup" : "";
        return (
            <RightSide name="Group">
                <div className="row">
                    <Notification  notification={message} classShow={classShow} deleteMessageAfterShow={this.deleteMessageAfterShow} />
                    <table className="table" style={{"marginTop": "30px", width: "100%"}}>
                        <thead className="thead-dark">
                            <tr>
                                <th scope="col">#</th>
                                <th style={{width: 400}} scope="col">Name</th>
                                <th scope="col">Description</th>
                                <th scope="col">Group ACP</th>
                                <th scope="col">Sattus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {groups.map( (gr, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row">{++index}</th>
                                        <td><Link to={`/admin/user/${gr._id}`}>{gr.name}</Link></td>
                                        <td>{gr.description}</td>
                                        <td>{gr.groupACP === false ? "Not allowed" : "Allowed"}</td>
                                        <td>{gr.status === false ? "Inactive" : "Active"}</td>
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