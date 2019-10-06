import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../controllers/user'

import "./Header.css";

class Header extends Component {

    constructor() {
        super();
        this.state = {

        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    toggleMenu = () => {
        const dropdownMenu = document.getElementById("dropdown-menu");
        const displayD = dropdownMenu.style.display === "block" ? "none" : "block" ;
        dropdownMenu.style.display = displayD;
    }

    showBar = () => {
        let leftS = document.getElementsByClassName("leftside")[0].style.left;
        if( leftS === 0 || leftS === "0px") {
            document.getElementsByClassName("leftside")[0].style.left = "-220px";
            if(document.getElementsByClassName("right-side")[0]) {
                document.getElementsByClassName("right-side")[0].style.marginLeft = "0";
            }
        } else {
            document.getElementsByClassName("leftside")[0].style.left = "0";
            if(document.getElementsByClassName("right-side")[0]) {
                document.getElementsByClassName("right-side")[0].style.marginLeft = "220px";
            }
        }

    }

    signOut = () => {
        localStorage.removeItem("jwt");
        window.location = "/admin/signin";
    }

    render() {
        const username = isAuthenticated().user.username;
        return (
            <header className="header">
                <Link className="logo" to="/admin/">
                    Liars Store
                </Link>
                <nav className="navbar navbar-static-top" role="navigation">
                    <button className="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button"  style={{cursor: "pointer"}}
                        onClick={this.showBar}    
                    >
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                    <div className="navbar-right">
                    <ul className="nav navbar-nav">
                        <li className="dropdown user user-menu open">
                            <button onClick={this.toggleMenu} className="dropdown-toggle" data-toggle="dropdown" style={{background: "transparent", "border": "none", cursor: "pointer"}}>
                                <i className="glyphicon glyphicon-user"></i>
                                <span>{username} <i className="caret"></i></span>
                            </button>
                            <ul id="dropdown-menu" className="dropdown-menu" style={{position: "absolute", left: -172, "display": "none"}}>
                               
                                <li className="user-header bg-light-blue">
                                    <img style={{borderRadius: "50%"}} src="https://res.cloudinary.com/daerg3axr/image/upload/v1556506252/t2kcphlnwggxbizbw0uz.jpg" className="img-circle" alt="User Image" />
                                    
                                    <div>
                                        {username} - Web Developer
                                        <p>
                                            <button onClick={this.signOut} style={{border: "none", background: "transparent", cursor: "pointer"}} className="fa fa-sign-out"></button>
                                        </p>
                                        {/* <small>Member since Nov. 2017</small> */}
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </nav>
            </header>
        )
    }
}

export default Header
