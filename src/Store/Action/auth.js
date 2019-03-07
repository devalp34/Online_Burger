import * as actionType from './actionsType';
import axios from 'axios';

export const authStart = () => {
    console.log("from authStart action")
    return{
        type : actionType.AUTH_START
    }
}

export const authSuccess = (token, userId) => {
    console.log("from auth action")
    return{
        type : actionType.AUTH_SUCCESS,
        idtoken : token,
        userId : userId
    }
}

export const logOut = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return{
        type : actionType.AUTH_LOGOUT
    }
}

export const authTimeOut = (timeOut) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(authTimeOut())
        }, timeOut * 1000)
    }
}

export const authFail = (err) => {
    console.log("from authFail action",err)
    return{
        type : actionType.AUTH_FAIL,
        error : err
    }
}

export const auth = (email, password, isSignedup) => {
    return dispatch => {
        dispatch(authStart())
        let url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyAPyZGVdh9Byipay_OC0TedqUCqtTeYYzY"
        if(!isSignedup){
            url = "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyAPyZGVdh9Byipay_OC0TedqUCqtTeYYzY" 
        }
        const authData = {
            email : email,
            password : password,
            returnSecureToken : true,
        }
        console.log("your authData is :",authData)
        axios.post(url, authData)
             .then(response => {
                 console.log("from response",response.data)
                const expiresDate = new Date(new Date().getTime() + response.data.expiresIn * 1000) 
                localStorage.setItem("token",response.data.idToken)
                localStorage.setItem("expirationDate",expiresDate)
                localStorage.setItem("userId",response.data.localId )
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(authTimeOut(response.data.expiresIn))
             })
             .catch(error => {
                 console.log("Hello error is : ",error.response.data.error)
                 dispatch(authFail(error.response.data.error))
             })
    } 
}

export const authSetRedirect = (path) => {
    return{
        type : actionType.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if(!token){
            dispatch(logOut())
        }else{
        const expiresDate = new Date(localStorage.getItem("expirationDate"))
        if(expiresDate <= new Date()){
            dispatch(logOut)
        }else{
            const userId = localStorage.getItem("userId")
            dispatch(authSuccess())
            dispatch(authTimeOut((expiresDate.getTime() - new Date().getTime()) / 1000))
        }
        }
    }
}