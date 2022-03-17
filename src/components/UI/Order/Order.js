import React from 'react';

import classes from './Order.css';
import Burger from '../../Burger/Burger';
import BurgerIngredient from '../../Burger/BurgerIngredients/BurgerIngredients';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux";
import * as actions from '../../../Store/actions/index';
import { setIngredients } from '../../../Store/actions/burgerBuilder';



const order = ( props ) => {
    //for burger
    let transformedIngredients= Object.keys(props.ingredients)
    .map(igKey =>{
        return [...Array(props.ingredients[igKey])].map((_,i) =>{
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        })
    }).reduce((arr, el) => {
        return arr.concat(el)
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>;
    }

    //for order
    const ingredients = [];

    for ( let ingredientName in props.ingredients ) {
        ingredients.push(
            {
                name: ingredientName,
                amount: props.ingredients[ingredientName]
            }
        );
    }

    //  console.log(ingredients)
    //  console.log(ingredients[0]['name'])
    const ingredientOutput = ingredients.map(ig => {
        return <span 
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                // border: '1px solid #ccc',
                padding: '5px'
                }}
            key={ig.name}>{ig.name} ({ig.amount})</span>;
    });

    const dispatch = useDispatch();
    const setIngredients =(args,price) =>{
        dispatch(actions.favReorder(args,price));
        <Redirect to='/checkout' />
    }

    return (
      
        <div className={classes.Order}>
            <div className={classes.burger_ing}>
             <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
            <p><strong>Ingredients:</strong> {ingredientOutput}</p></div>   
            <div className={classes.burger_ing}>
            <p><strong>Price: </strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</p>
            {props.onFavPage?<Link className={classes.link} to='/checkout' onClick={setIngredients.bind(this,props.ingredients,props.price)}>Reorder</Link>: null}
            </div>
        </div>
        
    );
};


    
export default order;