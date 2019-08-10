import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import { isAuthenticated } from '../controllers/user';
import { Redirect } from 'react-router-dom';


import "./css/AdminLTE.css";
import "./css/custom.css";
import "./css/font-awesome.min.css"; 

class StaticHTML extends Component {

    render() {
        if(!isAuthenticated()) return <Redirect to="/admin/signin" />
        return (
            <>
                <Header/>
                <Sidebar/>
            </>
        )
    }
}

export default StaticHTML;
