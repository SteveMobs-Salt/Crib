import React, { useState, useContext } from "react";
import axios from "axios";
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'

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
        <div className="login-form">
            <header>
                <h1>Welcome Back</h1>
            </header>
            <form onSubmit={onSubmit}>
                <input type='email' placeholder="Email"
                    required onChange={event => setEmail(event.target.value)} />
                <input type='password' placeholder="Password"
                    required onChange={event => setPassword(event.target.value)} />
                <div className="actions">
                    <h1>Sign in</h1>
                    <button type='submit'><FontAwesomeIcon icon={faArrowCircleRight} /></button>
                </div>
            </form>
            <Link to="/">Sign up here</Link>
        </div>
    )
}

export default SignInForm;
