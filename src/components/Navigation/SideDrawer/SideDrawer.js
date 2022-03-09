import React from 'react';

import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux';

const sideDrawer = (props) =>{
    let attachedClasses =[classes.SideDrawer, classes.Close];
    if(props.open){
        attachedClasses=[classes.SideDrawer, classes.Open]
    }
    return(
        <Aux>
            <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')} onClick={props.closed}>
            <Logo height="11%"/>
            <nav>
                <NavigationItems isAuthen={props.isAuth}/>
            </nav>
        </div>
        </Aux>
    )
}

export default sideDrawer;