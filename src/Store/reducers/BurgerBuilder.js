import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState={
    ingredients: null,
    totalPrice:4,
    error: false,
    building:false
};

const INGREDIENT_PRICES={
    salad: 0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7
};

const reducer = (state=initialState,action) =>{
    switch(action.type){
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient ={[action.ingredientName]: state.ingredients[action.ingredientName]+1};
            const updatedIngredients=updateObject(state.ingredients, updatedIngredient);
            const updatedState={
                ingredients:updatedIngredients,
                totalPrice:state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIngredient1 ={[action.ingredientName]: state.ingredients[action.ingredientName]-1};
            const updatedIngredients1=updateObject(state.ingredients, updatedIngredient1);
            const updatedState1={
                ingredients:updatedIngredients1,
                totalPrice:state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
                building:true
            }
            return updateObject(state, updatedState1);
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice:4,
                error: false,
                building:false
            });
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state,{
                error: true
            })
        case actionTypes.ADD_COKE:
            return updateObject(state,{
                totalPrice:state.totalPrice+2
            })
        case actionTypes.REMOVE_COKE:
            return updateObject(state,{
                totalPrice:state.totalPrice-2
            })
        case actionTypes.ADD_FRIES:
            return updateObject(state,{
                totalPrice:state.totalPrice+3
            })
        case actionTypes.REMOVE_FRIES:
            return updateObject(state,{
                totalPrice:state.totalPrice-3
            })
        case actionTypes.FAV_REORDER:
            return updateObject(state, {
                ingredients:{
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                totalPrice:action.price,
                error: false,
                building:false
            });
        default:
            return state;
    }
};

export default reducer;