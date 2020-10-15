import * as actionTypes from './actionTypes';
import axios from 'axios';

const httpOptions = {
    headers: { 'Content-Type': 'application/json' }
  };

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

export const authSuccess = (username , account , loading) =>{
    return {
        type: actionTypes.AUTH_SUCCESS,
        username: username,
        account : account,
        loading: loading
    }     
}

export const authloadfalse = () => {
    return {
        type: actionTypes.AUTH_LOADFALSE,
        loading:false
    }
}

export const authRegister = (name , username , password , account , callback) => {
    return dispatch => {
        
        dispatch(authStart())
        
        const authData = {
            name: name,
            username : username,
            password: password,
            account : account
        }
        
        axios.post('http://localhost:5000/api/auth/register',authData,httpOptions)
        .then(response => {
            dispatch(authloadfalse())
            callback(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const authLogin = (username , password , callback) => {
    
    return dispatch => {
    
    dispatch(authStart())
    const params = {
        username : username,
        password : password
    }

    axios.get('http://localhost:5000/api/auth/login',{params},httpOptions)
    .then(response => {
        
        if(response.data.success === "true"){
                dispatch(authSuccess(response.data.doc._id , response.data.doc.account , false))
                localStorage.setItem("username" , response.data.doc._id)
                localStorage.setItem("Account" , response.data.doc.account)
        }
        callback(response.data)
    })
    .catch(err => {
        console.log(err)
    })
    }
    
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL ,
        error: error
    }
}

export const authLogout = (callback) => {
    localStorage.removeItem('username')
    localStorage.removeItem('Account')
    callback()
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}