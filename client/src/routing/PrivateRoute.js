import React, { useContext, useState, useEffect} from 'react'
import  { Route, Redirect } from 'react-router-dom'
import AuthContext from '../context/auth/authContext'

export default function PrivateRoute({ component : Component, ...rest}) {
    const authContext = useContext(AuthContext)
    const { loadUser, user } = authContext;
    const [state, setState] = useState({
        isLoading : true
    })
    async function fetchData() {
        const response = await loadUser()
        console.log(response)
        setState({...state, isLoading : false})
        return  (<Route 
            {...rest}
            render = {props =>  (<Component {...props} />)}
        />)
        // ...
      }
    useEffect(() => {
        console.log("hello")
          if(localStorage.token){
            fetchData();
        }  else {
            setState({...state, isLoading : false})
        }
    }, [ ])

    const { isAuth, loading } = authContext;
    const { isLoading } = state;
    console.log(isLoading)
    console.log(authContext)
    return (
        <>
            { isLoading ? "...loading": <Route 
                {...rest}
                render = {props => !isAuth && !loading ? (<Redirect to="/login" /> ): (<Component {...props} />)}
            />}
        </>
    )
}
