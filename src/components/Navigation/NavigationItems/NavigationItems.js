import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';


const navigationItems = (props) => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link="/" exact>Burger Builder</NavigationItem>
        {props.isAuthen?<NavigationItem link="/orders">Orders</NavigationItem>: null}
        {props.isAuthen?<NavigationItem link="/favs">Favourites</NavigationItem>: null}
        {props.isAuthen?<NavigationItem link="/logout">Logout</NavigationItem>:
        <NavigationItem link="/auth">Authenticate</NavigationItem>}
    </ul>
);


export default navigationItems;