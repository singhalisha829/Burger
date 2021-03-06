import * as actionTypes from './actionTypes';

import axios from "../../axios-orders";

export const addIngredient = (name) =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const fetchIngredientsFailed = () =>{
    return{
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    }
}

export const addCoke=(totalPrice)=>{
    return{
        type:actionTypes.ADD_COKE,
        totalPrice:totalPrice
    }
}

export const removeCoke=(totalPrice)=>{
    return{
        type:actionTypes.REMOVE_COKE,
        totalPrice:totalPrice
    }
}

export const addFries=(totalPrice)=>{
    return{
        type:actionTypes.ADD_FRIES,
        totalPrice:totalPrice
    }
}

export const removeFries=(totalPrice)=>{
    return{
        type:actionTypes.REMOVE_FRIES,
        totalPrice:totalPrice
    }
}

export const setIngredients = (ingredients) =>{
    return{
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const favReorder = (ingredients,price) =>{
    return{
        type: actionTypes.FAV_REORDER,
        ingredients: ingredients,
        price:price
    }
}

export const initIngredients = () =>{
    return dispatch =>{
        axios.get('https://my-burger-3b88c-default-rtdb.firebaseio.com/ingredients.json')
        .then(response =>{
            dispatch(setIngredients(response.data))
        })
        .catch(error=>{
            dispatch(fetchIngredientsFailed())
        })
    }
}