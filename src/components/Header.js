import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import "./Header.css";

class Header extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
    }

    render() {
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
                            <li className="dropdown notifications-menu">
                                <Link className="dropdown-toggle count-notifications" data-toggle="dropdown"  to="/admin/">
                                    <i className="glyphicon glyphicon-globe"></i>
                                </Link>
                                <ul className="dropdown-menu">
                                    <li className="header">You don't have any notification</li>
                                    <li>
                                        <div className="slimScrollDiv" ><ul className="menu">
                                            <li className="count-sales-made">
                                            </li>
                                        </ul><div className="slimScrollBar" ></div><div className="slimScrollRail"></div></div>
                                    </li>
                                    <li className="footer"><Link  to="/admin/">View all</Link></li>
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