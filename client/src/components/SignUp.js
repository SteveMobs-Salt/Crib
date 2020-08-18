import React, { useState, useContext } from "react";
import axios from "axios";
import UserContext from '../UserContext';
import { BrowserRouter as Router, Switch, Route, Link, useHistory } from 'react-router-dom';


const SignUpForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const history = useHistory();
    const { setUserID, setHouseholdID } = useContext(UserContext);

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
                console.log(res)
                // res.data.household
                // res.data.user
                // save to state/context for further interaction
                setUserID(res.data.user)
                setHouseholdID(res.data.household)
                // window.location.href = '/dashboard';
                // window.location.replace("/dashboard");
                history.push('/dashboard')
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="loginForm">
            <header>
                <h1>Sign up</h1>
            </header>
        <form onSubmit={onSubmit}>
            <p><label>Name</label></p>
            <input type="text" required onChange={event => setName(event.target.value)}/>
            <p><label>Email</label></p>
            <input type='email' required onChange={event => setEmail(event.target.value)}/>
            <p><label>Password</label></p>
            <input type='password' required onChange={event => setPassword(event.target.value)}/>
            <button type='submit'>submit</button>
        </form>
            <p>Already have an account? <a href="# ">Login here!</a></p>

        </div>
    )}

export default SignUpForm;
