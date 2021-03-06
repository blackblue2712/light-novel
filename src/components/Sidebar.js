import React, { Component } from 'react';
import './Sidebar.css';
import { Link , withRouter } from 'react-router-dom';
import { isAuthenticated } from '../controllers/user'
class Sidebar extends Component {
    constructor() {
        super();
        this.state = {
            isActive: false
        }
    }

    // shouldComponentUpdate(nextProps, nextState) {
    //     return false;
    // }

    componentDidMount() {
        const path = this.props.location.pathname;
        const pathActive = path.split("/")[path.split("/").length - 1];
        const itemActive = document.getElementById(pathActive);
        if(itemActive) {
            itemActive.classList.add("active");
        }
    }

    componentDidUpdate() {
        const listLi = Array.from(document.querySelectorAll(".sidebar-menu > li"));
        listLi.map( li => li.classList.remove("active"));

        const path = this.props.location.pathname;
        const pathActive = path.split("/")[path.split("/").length - 1];
        const itemActive = document.getElementById(pathActive);
        if(itemActive) {
            itemActive.classList.add("active");
        }
    }
    
    render() {
        
        const username = isAuthenticated().user.username;
        return (
            <section className="sidebar leftside">
                
                <div className="user-panel">
                    <div className="pull-left image">
                        {/* <img src="" className="img-circle" alt="User Image" /> */}
                    </div>
                    <div className="pull-left info">
                        <p style={{color: "white"}}>Hello, {username}</p>
                        <Link to="/admin/"><i className="fa fa-circle text-success"></i> Online</Link>
                    </div>
                </div>
                
                <ul className="sidebar-menu">
                    <li className="sidebar-index" id="admin">
                        <Link to="/admin">
                            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                        </Link>
                    </li>
                    
                    
                    {/* <li className="treeview sidebar-config">
                        <a href="#">
                            <i className="fa fa-cog"></i> <span>Config</span>
                            <i className="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul className="treeview-menu">
                            <li className=""><a href="#"><i className="fa fa-angle-double-right"></i>Email</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i>Image</a></li>
                        </ul>
                    </li> */}
                    
                    
                    <li className="sidebar-group" id="group">
                        <Link to="/admin/group">
                            <i className="fa fa-group"></i> <span>Group</span>
                        </Link>
                    </li>

                    
                    <li className="sidebar-user" id="user">
                        <Link to="/admin/user">
                            <i className="fa fa-user"></i> <span>User</span> <small className="badge pull-right bg-red">4</small>
                        </Link>
                    </li>

                    
                    <li className="sidebar-category" id="category">
                        <Link to="/admin/category">
                            <i className="fa fa-suitcase"></i> <span>Category</span>
                        </Link>
                    </li>

                    
                    <li className="sidebar-book" id="book">
                        <Link to="/admin/book">
                            <i className="fa fa-book"></i> <span>Book</span> <small className="badge pull-right bg-green">12</small>
                        </Link>
                    </li>
                    
                    {/* <li className="sidebar-chapter">
                        <a href="javascript:void(0)">
                            <i className="fa fa-tags"></i> <span>Chapter</span> <small className="badge pull-right bg-green"></small>
                        </a>
                    </li>
                    
                    
                    <li className="sidebar-cart-book">
                        <a href="">
                            <i className="fa fa-shopping-cart"></i> <span>Shopping cart</span> <small className="badge pull-right bg-orange">1</small>
                        </a>
                    </li>

                    
                    <li className="treeview sidebar-analytics">
                        <a href="#">
                            <i className="fa fa-xing"></i> <span>Analytics</span>
                            <i className="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul className="treeview-menu">
                            <li className="sidebar-menu-overview"><a href=""><i className="fa fa-angle-double-right"></i>Overview</a></li>
                            <li className="sidebar-menu-month"><a href=""><i className="fa fa-angle-double-right"></i>Month</a></li>
                        </ul>
                    </li> */}
                </ul>
            </section>
        )
    }
}

export default withRouter(Sidebar);