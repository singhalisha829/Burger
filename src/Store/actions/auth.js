import * as actionTypes from '../actions/actionTypes';
import axios from 'axios';
import ax from '../../axios-orders';

export const authStart= () =>{
    return{
        type: actionTypes.AUTH_START
    }
}

export const authSuccess= (token, userId) =>{
    return{
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId:userId
    }
}

export const authFail= (error) =>{
    return{
        type: actionTypes.AUTH_FAIL,
        error:error
    }
}

export const logout = () =>{
    return{
        type: actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeout = (expirationTime) =>{
    return dispatch =>{
        setTimeout(()=>{
            dispatch(logout());
        }, expirationTime*1000);
    }
}

export const auth= (email, password, isSignUp,display_name) =>{
    return dispatch =>{
        dispatch(authStart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_vmTu0wug_KpqbwzZEonv9A2RdbMOCVs';
        if(!isSignUp){
            url='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_vmTu0wug_KpqbwzZEonv9A2RdbMOCVs';
            axios.post(url, authData)
        .then(response =>{
            console.log(response);
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
        }
        else{
            axios.post(url, authData)
        .then(response =>{
            console.log(response);
            ax.post('/users.json',{email:response.data.email, name:display_name})
            dispatch(authSuccess(response.data.idToken,response.data.localId))
            dispatch(checkAuthTimeout(response.data.expiresIn))
        })
        .catch(err =>{
            console.log(err);
            dispatch(authFail(err.response.data.error));
        })
        }
    }
}