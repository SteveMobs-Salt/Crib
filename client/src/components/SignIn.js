import React, { useState, useContext } from "react";
import axios from "axios";
import { Link, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'
import HouseholdContext from '../contexts/HouseholdContext';
import criblogo from '../images/Crib_copy.png';


const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const name = useState('');
    const history = useHistory();
    const { setUser } = useContext(HouseholdContext);
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
                setUser({
                    userId: res.data.user,
                    name: res.data.name
                });
                history.push('/dashboard');
            })
            .catch(err => {
                console.log(err);
                console.log(err.response);
            });
    };

    return (
        <div className="login-form">
                <div className="crib-login">
                    <img src={criblogo} alt="crib-login" />
                </div>
                <header>
                    <h1>Welcome Back</h1>
                </header>
                <form onSubmit={onSubmit}>
                    <input type='email' placeholder="Email" autoComplete="true"
                        required onChange={event => setEmail(event.target.value)} />
                    <input type='password' placeholder="Password" autoComplete="true"
                        required onChange={event => setPassword(event.target.value)} />
                    <div className="actions">
                        <h1>Sign In</h1>
                        <button type='submit'><FontAwesomeIcon icon={faArrowCircleRight} /></button>
                    </div>
                </form>
                <p className="log-type">
                    <Link to="/">Sign up</Link>
                </p>
            </div>
    )
}

export default SignInForm;
