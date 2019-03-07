import * as actionTypes from './actionsType';
import axios from '../../Axios';

export const addIngrediant = (name) => {
    console.log("From Action Burger Construct Add method")
    return{
        type : actionTypes.ADD_INGREDIANT,
        ingrediantName : name
    }
};

export const removeIngrediant = (name) => {
    console.log("From Action Burger Construct remove method")
    return{
        type : actionTypes.REMOVE_INGREDIANT,
        ingrediantName : name
    }
};

export const setIngrediant = (ingrediant) => {
    return {
        type : actionTypes.SET_INGREDIANT,
        ingrediant : ingrediant
    }
}

export const setError = () => {
    return {
        type : actionTypes.SET_FETCH_ERROR,
        // error : err
    }
}

export const initIngrediant = () => {
    console.log("from initIngrediant action creator")
    return dispatch => {
        axios.get('https://magic-burger-838b0.firebaseio.com/dish.json')
             .then(response => {
                 dispatch(setIngrediant(response.data))
             })
             .catch(error => {
                 dispatch(setError())
             })
    }
}