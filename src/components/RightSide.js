import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class RightSide extends Component {

    render() {
        return (
            <aside className="right-side">
                <section className="content-header">
                    <h1>
                        Dashboard
                        <small>Control panel</small>
                    </h1>
                    <ol className="breadcrumb">
                        <li><Link to="/admin/"><i className="fa fa-dashboard"></i> Home</Link></li>
                        <li className="active">{this.props.name}</li>
                    </ol>
                </section>

                
                <section className="content">
                    {this.props.children}
                </section>
            </aside>
        )
    }
}

export default RightSide;