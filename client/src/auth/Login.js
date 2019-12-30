import React, { useState, useEffect, useContext } from 'react'
import { Link } from "react-router-dom";
import "./Auth.css"
import FormNavBar from './FormNavBar';
import Alerts from '../common/alert/Alerts';
import AuthContext from '../context/auth/authContext';
import AlertContext from '../context/alert/alertContext';

export default function Login(props) {
    const [ user, setUser] = useState({
        email : '',
        password : ''
    })

    const authContext = useContext(AuthContext)
    const alertContext = useContext(AlertContext)

    const { error, login, isAuth, clearErrors} =  authContext
    const { setAlert } = alertContext
    useEffect(() => {
        if (isAuth) {
            props.history.push('/dashboard');
          }
      
          if (error) {
            setAlert(error, 'danger');
            clearErrors();
          }
          // eslint-disable-next-line
    },[ error, isAuth, props.history])
    const onChange = e => setUser({...user, [e.target.name] : e.target.value})

    const onSubmit = (e) => {
        e.preventDefault();
    if (email === '' || password === '') {
      setAlert('Please fill in all fields', 'danger');
    } else {
      login({
        email,
        password
      });
    }
    }
    const { email, password} = user;
    return (
        <div className="form-Container">
            <FormNavBar />
            <Alerts />
             <form onSubmit={onSubmit}>
                <h2>Welcome Back!</h2>
                <fieldset>
                    <ul>
                        <li>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={email}
                                onChange={onChange} required />
                        </li>
                        <li>
                            <label htmlFor="password">Password:</label>
                            <input type="password" id="password" name="password" name='password'
                                value={password}
                                onChange={onChange} required />
                        </li>
                        <li>
                            <i />
                            {/* <a href="#">Forgot Password?</a> */}
                        </li>
                    </ul>
                </fieldset>
                <button type='submit' >Login</button>
                <Link to="/register"><div>Create an Account</div></Link>
            </form>
        </div>
    )
}
