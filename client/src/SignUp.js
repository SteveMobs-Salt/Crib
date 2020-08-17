import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
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
        <form onSubmit={onSubmit}>
            <label>Name</label>
            <input type="text" required onChange={event => setName(event.target.value)}/>
            <label>Email</label>
            <input type='email' required onChange={event => setEmail(event.target.value)}/>
            <label>Password</label>
            <input type='password' required onChange={event => setPassword(event.target.value)}/>
            <button type='submit'>submit</button>
        </form>

    )}

export default LoginForm;
