import React from 'react';

import classes from './Order.css';
import Burger from '../../Burger/Burger';
import BurgerIngredient from '../../Burger/BurgerIngredients/BurgerIngredients';

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

    return (
        <div className={classes.Order}>
             <div className={classes.Burger}>
            <BurgerIngredient type='bread-top' />
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom' />
        </div>
            <p><strong>Ingredients:</strong> {ingredientOutput}</p>
            <p><strong>Price: </strong>USD {Number.parseFloat( props.price ).toFixed( 2 )}</p>
        </div>
    );
};

export default order;