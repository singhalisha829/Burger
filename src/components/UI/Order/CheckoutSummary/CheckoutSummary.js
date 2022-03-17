import React from "react";

import Burger from "../../../Burger/Burger";
import Button from "../../Button/Button";
import classes from '../CheckoutSummary/CheckoutSummary.css';
import coke from '../../../../assets/images/coke.jpg';

const checkoutSummary =(props) =>{
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%',margin:'auto',display:'flex',flexDirection:'row'}}>
                <Burger ingredients={props.ingredients} />
                <img src={coke}  />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default checkoutSummary;