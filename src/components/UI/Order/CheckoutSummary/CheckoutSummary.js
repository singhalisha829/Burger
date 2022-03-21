import React from "react";

import Burger from "../../../Burger/Burger";
import Button from "../../Button/Button";
import classes from '../CheckoutSummary/CheckoutSummary.css';
import coke from '../../../../assets/images/coke.jpg';
import { connect , useDispatch} from "react-redux";
import * as actions from '../../../../Store/actions/index';

const checkoutSummary =(props) =>{


    const dispatch = useDispatch();
    const handleOnChange = () =>{
        dispatch(actions.setCoke(props.isCoke))
        dispatch(actions.orderCoke(props.price))
    }
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%',margin:'auto',display:'flex',flexDirection:'row'}}>
                <Burger ingredients={props.ingredients} />
                {props.isCoke?<img src={coke}  />: null}
            </div>
            <p>Complete your meal with...<br/>
            <input type="checkbox" id="fav" name="fav"
          onChange={handleOnChange} /> Coke</p><br/>
          <p>{props.isCoke?<strong>Total Price: {props.price.toFixed(2)} </strong>: null}</p>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            
        </div>
    )
}

const mapStateToProps = state =>{
    return{
       isCoke:state.order.isCoke,
       price:state.burgerBuilder.totalPrice
    }
}

export default connect(mapStateToProps)(checkoutSummary);