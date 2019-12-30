import React, { useReducer } from "react";
import axios from "axios"
import AuthContext from "./authContext"
import authReducer from "./authReducer"
import setAuthToken from "../../utils/setAuthToken";
import {
    LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT, REGISTER_FAIL, REGISTER_SUCCESS, AUTH_ERROR, USER_LOADED, CLEAR_ERRORS
} from "../types"

const config = {
    headers: {
        "Content-Type": "application/json"
    }
}
const AuthState = props => {
    const initialState = {
        token: localStorage.getItem("token"),
        isAuth: null,
        loading: null,
        user: null,
        error: null
    }
    const [state, dispatch] = useReducer(authReducer, initialState)

    const loadUser = async () => {
        setAuthToken(localStorage.token)
        
        try {
            const res = await axios.get("/api/user/login")
            console.log(res)
            dispatch({
                type: USER_LOADED,
                payload: res.data
            });
        } catch(error) {
            console.log(error.response)
            dispatch({ type: AUTH_ERROR });
        }

    }

    const login = async formData => {
        try {
            const res = await axios.post("/api/user/login", formData, config)
            console.log(res)
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            })
            loadUser()
        } catch (error){
            console.log(error.response)
            dispatch({
                type : LOGIN_FAIL,
                payload: error.response.data.message
            })
        }
    }

    const logout = () => {
        dispatch({
            type : LOGOUT
        })
    }
    const register = async formData => {
        console.log("i reached")

        try {
            const res = await axios.post("/api/user/signup", formData, config)
            console.log(res,"hellooo")
            dispatch({
                type: REGISTER_SUCCESS,
                payload: res.data
            })
            loadUser();
        } catch(error) {
            console.log(error.response.data.message)
            dispatch({
                type: REGISTER_FAIL,
                payload: error.response.data.message
              });
        }
    }

    const clearErrors = () => dispatch({ type: CLEAR_ERRORS });

    return (
        <AuthContext.Provider value={{
            token: state.token,
            isAuth: state.isAuth,
            loading: state.loading,
            user: state.user,
            error: state.error,
            register,
            loadUser,
            login,
            logout,
            clearErrors
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}

export default AuthState;