import * as actionTypes from '../Action/actionsType';
import {utility} from '../../Shared/Utility';

const initialState = {
    ingrediant: null, 
    totalPrice : 4,
    error : false,
    building : false
}

const INGREDIANT_PRICE = {
    salad : 0.5,
    cheese : 0.4,
    meat : 1.3,
    bacon : 0.6
}

const addIng = (state,action) => {
    const updateObj = utility(state.ingrediant,{
        [action.ingrediantName] : state.ingrediant[action.ingrediantName] + 1
        })
    const updateState = {
        ingrediant : updateObj,
        totalPrice : state.totalPrice + INGREDIANT_PRICE[action.ingrediantName],
        building   : true
        }         
     return utility(state,updateState )
}

const removeIng = (state,action) => {
    const tempObj = {[action.ingrediantName] : state.ingrediant[action.ingrediantName] - 1};
    const updateObj1 = utility(state.ingrediant,tempObj);
    const uState = {
                ingrediant : updateObj1,
                totalPrice : state.totalPrice - INGREDIANT_PRICE[action.ingrediantName],
                building   : true
                };
    return utility(state,uState)
}

const setIng = (state,action) => {
    return  utility(state,{
        ingrediant : action.ingrediant,
        totalPrice : 4,
        error      : false,
        building   : false
    })
}

const fetchError = (state,action) => {
    return utility(state,{error : true})
}

const reducer = (state = initialState , action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIANT:    return addIng(state,action);
        case actionTypes.REMOVE_INGREDIANT: return removeIng(state,action)
        case actionTypes.SET_INGREDIANT:    return setIng(state,action)
        case actionTypes.SET_FETCH_ERROR:   return fetchError(state,action)
        default:
            return state;
    }
}

export default reducer;