import React, { useState } from "react";
import axios from "axios";

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

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
                console.log(res);
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
        </div>
    )}

export default SignInForm;
