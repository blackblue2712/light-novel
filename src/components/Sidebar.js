import React, { Component } from 'react';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../controllers/user'
class Sidebar extends Component {

    shouldComponentUpdate(nextProps, nextState) {
        return false;
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
                    {/* <li className="sidebar-index">
                        <a href="">
                            <i className="fa fa-dashboard"></i> <span>Dashboard</span>
                        </a>
                    </li>
                    
                    
                    <li className="treeview sidebar-config">
                        <a href="#">
                            <i className="fa fa-cog"></i> <span>Config</span>
                            <i className="fa fa-angle-left pull-right"></i>
                        </a>
                        <ul className="treeview-menu">
                            <li className=""><a href="#"><i className="fa fa-angle-double-right"></i>Email</a></li>
                            <li><a href="#"><i className="fa fa-angle-double-right"></i>Image</a></li>
                        </ul>
                    </li> */}
                    
                    
                    {/* <li className="sidebar-group">
                        <a href="">
                            <i className="fa fa-group"></i> <span>Group</span>
                        </a>
                    </li>

                    
                    <li className="sidebar-user">
                        <a href="">
                            <i className="fa fa-user"></i> <span>User</span> <small className="badge pull-right bg-red">4</small>
                        </a>
                    </li> */}

                    
                    <li className="sidebar-category">
                        <Link to="/admin/category">
                            <i className="fa fa-suitcase"></i> <span>Category</span>
                        </Link>
                    </li>

                    
                    <li className="sidebar-book">
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

export default Sidebar;