import React, { useState, useContext} from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();

    const onSubmit = event => {
        event.preventDefault();

        const userData = {
            email,
            password,
            name,
        };
        axios
            .post('/api/auth/register_login', userData)
            .then(res => {
                history.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="loginForm">
            <header>
                <h1>Sign in</h1>
            </header>
        <form onSubmit={onSubmit}>
            <p>Welcome back to your Pad!</p>
            <p><label>Email</label></p>
            <input type='email' required onChange={event => setEmail(event.target.value)}/>
            <p><label>Password</label></p>
            <input type='password' required onChange={event => setPassword(event.target.value)}/>
            <button type='submit'>submit</button>
        </form>
        <Link to="/">Sign up here</Link>
        </div>
    )}

export default SignInForm;
