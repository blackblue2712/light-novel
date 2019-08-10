import React, { Component } from 'react';
import './Signin.css';
import { postSignin, authenticate, isAuthenticated } from '../controllers/user';
import { Redirect } from 'react-router-dom';

window.onload = () => {
    const inputRequireDom = Array.from(document.getElementsByTagName("input"));
    inputRequireDom.slice(0, inputRequireDom.length - 1).map( ip => {
        ip.required = true;
    })
}

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            username: '',
            password: '',
            isSigninSuccess: false,
            loading: false
        }

        // this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit = (e) => {

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        if(username !== '' && password !== '') {
            e.preventDefault();
            postSignin( {username, password} )
                .then( res => {
                    if(res.error) {
                        alert(res.error)
                    }else {
                        authenticate(res, () => {
                            this.setState( {loading: false, isSigninSuccess: true} );
                        })
                    }
                })
        }
    }

    componentDidMount() {
        const data = isAuthenticated();
        if(isAuthenticated()) {
            this.setState( {isSigninSuccess: true} );
        }
    }

    render() {
        const { loading, isSigninSuccess } = this.state;
        if(isSigninSuccess) return <Redirect to="/admin/"/>
        return (
            <div className="wrapper">
                <div class="box-form">
                    <h2>Login</h2>
                    <form>
                        <div className="inputBox">
                            <input type="text" name="username" id="username"/>
                            <label htmlFor="name">Username</label>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="email" id="email"/>
                            <label htmlFor="name">Email</label>
                        </div>
                        <div className="inputBox">
                            <input type="text" name="fullname" id="fullname"/>
                            <label htmlFor="name">Fullname</label>
                        </div>
                        <div className="inputBox">
                            <input type="password" name="password" id="password"/>
                            <label htmlFor="password">Password</label>
                        </div>
                        <input type="submit" name="" value="Submit" onClick={this.handleSubmit}/>
                    </form>
                </div>
            </div>
        )
    }
}

export default Signin;