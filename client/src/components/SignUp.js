import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../contexts/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowCircleRight } from '@fortawesome/free-solid-svg-icons'


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
        <h1>Create Account</h1>
      </header>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          required
          placeholder="Name"
          onChange={event => setName(event.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          required
          onChange={event => setEmail(event.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={event => setPassword(event.target.value)}
        />
        <div className="actions">
          <h1>Sign Up</h1>
          <button type="submit">
            <FontAwesomeIcon icon={faArrowCircleRight} />
          </button>
        </div>
      </form>
      <p className="log-type">
        <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUpForm;
