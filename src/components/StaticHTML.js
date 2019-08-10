import React, { Component } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';


import "./css/AdminLTE.css";
import "./css/custom.css";
import "./css/font-awesome.min.css"; 

class StaticHTML extends Component {

    render() {
        return (
            <>
                <Header/>
                <Sidebar/>
            </>
        )
    }
}

export default StaticHTML;
