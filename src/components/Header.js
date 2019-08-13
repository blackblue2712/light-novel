import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../controllers/user'

import "./Header.css";

class Header extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    toggleMenu = () => {
        const dropdownMenu = document.getElementById("dropdown-menu");
        const displayD = dropdownMenu.style.display === "block" ? "none" : "block" ;
        dropdownMenu.style.display = displayD;
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
                    <Link className="navbar-btn sidebar-toggle" data-toggle="offcanvas" role="button"  to="/admin/">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </Link>
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