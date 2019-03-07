import * as actionType from '../Action/actionsType';
import {utility} from '../../Shared/Utility';

const initialState = {
    token : null,
    userId : null,
    error : null,
    loading : null,
    authRedirectPath : "/"
}

const authStart = (state,action) => {
    console.log("from auth start reducer")
    return utility(state,{error : null, loading : true})
}

const authSuccess = (state,action) => {
    console.log("from authSuccess :")
    return utility(state,{
        token : action.idtoken,
        userId : action.userId,
        error : null,
        loading : false
    })
}

const authLogout = (state,action) => {
    return  utility(state,{token : null, userId : null})
}

const authFail = (state,action) => {
    console.log("from auth fail :",action.error.message)
    return utility(state,{error : action.error, loading : false})
    
}

const setRedirecPath = (state,action) => {
    return utility(state,{authRedirectPath : action.path})
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionType.AUTH_START      : return authStart(state,action)
        case actionType.AUTH_SUCCESS    : return authSuccess(state,action)
        case actionType.AUTH_FAIL       : return authFail(state,action)
        case actionType.AUTH_LOGOUT     : return authLogout(state,action)
        case actionType.SET_AUTH_REDIRECT_PATH : return setRedirecPath(state,action)
        default                         : return state
    }
}

export default reducer;