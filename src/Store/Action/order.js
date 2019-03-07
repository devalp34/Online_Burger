import * as orderActionType from '../Action/actionsType';
import axios from '../../Axios';

export const burgerSuccess = (id,orderData) => {
    return{
        type : orderActionType.BURGER_PURCHASE_SUCCESS,
        id : id,
        orderData : orderData
    }
}

export const burgerFailure = (err) => {
    return{
        type : orderActionType.BURGER_PURCHASE_FAIL,
        error : err
    }
}

export const purchaseBurgurStart = () => {
    return{
        type : orderActionType.PURCHASE_BURGUR_START
    };
};

export const burgerStart = (orderData,token) => {
    return dispatch => {
        //dispatch(purchaseBurgurStart()),
        axios.post('/orders.json?auth='+token,orderData)
        .then(response => {
            dispatch(burgerSuccess(response.data.name,orderData))
        })
        .catch(error => {
            dispatch(burgerFailure(error))
        });
    }
}

export const burgerInit = () => {
    return{
        type : orderActionType.BURGER_INIT
    }
}

export const fetchOrderSucess = (order) => {
    return{
        type : orderActionType.FETCH_ORDER_SUCCESS,
        orders :order
    }
}

export const fetchOrderFail = (err) => {
    return{
        type : orderActionType.FETCH_ORDER_FAIL,
        error : err
    }
}

export const fetchOrderStart = () => {
    return{
        type : orderActionType.FETCH_ORDER_START
    }
}

export const fetchOrder = (token,userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        console.log("from Order action:",userId)
        const queryParam = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId +'"';
        axios.get("/orders.json" + queryParam)
             .then(res => {
                 const fetchedOrders = []
                  for(let key in res.data){
                     fetchedOrders.push({
                         ...res.data[key],
                         id : key
                     })
                 }
                 //console.log("from fetch orders :",fetchedOrders)
                 dispatch(fetchOrderSucess(fetchedOrders))
             })
             .catch(err => {
                 dispatch(fetchOrderFail(err))
             })
    }
}