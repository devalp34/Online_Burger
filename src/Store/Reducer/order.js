import * as actionType from '../Action/actionsType';
import {utility} from '../../Shared/Utility';

const initialState = {
    orders : [],
    loading : false,
    purchased :false
}

const initBurger = (state,action) => utility(state, {purchased : false})
const purchseBurgerStart = (state,action) => utility(state, {loading : true})
const purchseBurgerSuccess = (state,action) => {
    const tempObj = {
        ...action.orderData,
        id : action.id,
    }
    return utility(state, {
        loading : false,
        purchased : true,
        orders : state.orders.concat(tempObj)
    })
}
const purchseBurgerFail = (state,action) => utility(state, {loading : false})
const orderFetchSuccess = (state,action) => utility(state, {
                                                          orders : action.orders,
                                                          loading : false
                                                    })
const orderFetchStart = (state,action) => utility(state, {loading : false})
const orderFetchFail = (state,action) => utility(state, {loading : true})

const orderReducer = (state = initialState,action) => {
    switch (action.type){
        case actionType.BURGER_INIT:            return initBurger(state,action)
        case actionType.PURCHASE_BURGUR_START:  return purchseBurgerStart(state,action) 
        case actionType.BURGER_PURCHASE_SUCCESS:return purchseBurgerSuccess(state,action)
        case actionType.BURGER_PURCHASE_FAIL:   return purchseBurgerFail(state,action) 
        case actionType.FETCH_ORDER_SUCCESS:    return orderFetchSuccess(state,action) 
        case actionType.FETCH_ORDER_FAIL:       return orderFetchFail(state,action)
        case actionType.FETCH_ORDER_START:      return orderFetchStart(state,action)
        default:                                return state
    }
}

export default orderReducer;