import React, { useEffect, useContext, useState } from 'react'
import { Link } from "react-router-dom"
import "./Auth.css"
import FormNavBar from './FormNavBar'
import AuthContext from '../context/auth/authContext'
import AlertContext from '../context/alert/alertContext'
import Alerts from '../common/alert/Alerts'

export default function Register(props) {

    const authContext = useContext(AuthContext)
    const { register, error, clearErrors, isAuth } = authContext;
    const alertContext = useContext(AlertContext)
    const { setAlert } = alertContext;
    useEffect( () => {
        if (isAuth) {
            props.history.push('/dashboard');
          }
          console.log(error)
          if (error) {
            setAlert(error,'danger');
            clearErrors();
          }
          // eslint-disable-next-line
    },[ error, isAuth, props.history])

    const [user, setUser] = useState({
        email: '',
        userName: '',
        password: '',
        password2: ''
    })
    const onChange = e => setUser({ ...user, [e.target.name]: e.target.value })

    const { email, userName, password, password2 } = user;

    const onSubmit = (e) => {
        e.preventDefault();
        if (userName === '' || email === '' || password === '') {
          setAlert('Please enter all fields', 'danger');
        } else if (password !== password2) {
          setAlert('Passwords do not match', 'danger');
        } else {
            console.log()
          register({
            userName,
            email,
            password
          });
        }
    }
    return (
        <div className="bg-primaryShade">
            <FormNavBar />
            <div className="form-Container">   
                <form onSubmit={onSubmit}>
                    <h2>Sign Up!</h2>
                    <fieldset>
                        <ul>
                            <li>
                                <label htmlFor="email">Email:</label>
                                <input type="email" id="email" name='email'
                                    value={email}
                                    onChange={onChange} required />
                            </li>
                            <li>
                                <label htmlFor="userName">User Name:</label>
                                <input type="text" id="userName" name='userName'
                                    value={userName}
                                    onChange={onChange} required />
                            </li>
                            <li>
                                <label htmlFor="password">Password:</label>
                                <input type="password" id="password" name="password" value={password}
                                    onChange={onChange} required />
                            </li>
                            <li>
                                <label htmlFor="password2">Confirm Password:</label>
                                <input type="password" id="password2" name='password2'
                                    value={password2}
                                    onChange={onChange} required minLength='6' />
                            </li>
                        </ul>
                    </fieldset>
                    <button type='submit'>Submit</button>
                    <Link to="/login"><div >Have an Account?</div></Link>
                </form>
            </div>
        </div>
    )
}
