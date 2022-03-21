import React from "react";

import Burger from "../../../Burger/Burger";
import Button from "../../Button/Button";
import classes from '../CheckoutSummary/CheckoutSummary.css';
import coke from '../../../../assets/images/coke.jpg';
import fries from '../../../../assets/images/fries.png';
import { connect , useDispatch} from "react-redux";
import * as actions from '../../../../Store/actions/index';

const checkoutSummary =(props) =>{


    const dispatch = useDispatch();
    const onClickingCoke = () =>{
        dispatch(actions.setCoke(props.isCoke))
        if(!props.isCoke){
        dispatch(actions.addCoke(props.price))
        }else{  
        dispatch(actions.removeCoke(props.price))
        }
    }

    const onClickingFries = () =>{
        console.log(props.isFries)
        dispatch(actions.setFries(props.isFries))
        if(!props.isFries){
            console.log('add')
        dispatch(actions.addFries(props.price))
        }else{  
            console.log('remove')
        dispatch(actions.removeFries(props.price))
        }
    }
    return(
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes well!</h1>
            <div style={{width:'100%'}}>
                <Burger ingredients={props.ingredients} />
                {props.isCoke?<img src={coke}  />: null}
                {props.isFries?<img src={fries} />:null}
            </div>
            <div className={classes.Box}>
            <p>Complete your meal with...<br/>
            <input type="checkbox" id="fav" name="fav"
          onChange={onClickingCoke} /> Coke <br/>  
          <input type="checkbox" id="fav" name="fav"
          onChange={onClickingFries} /> Fries</p></div>
          <p><strong>Total Price: {props.price.toFixed(2)} </strong></p>
            <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            
        </div>
    )
}

const mapStateToProps = state =>{
    return{
       isCoke:state.order.isCoke,
       price:state.burgerBuilder.totalPrice,
       isFries:state.order.isFries
    }
}

export default connect(mapStateToProps)(checkoutSummary);