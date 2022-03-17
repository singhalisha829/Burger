import React ,{ Component , useState} from 'react';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Aux';
import Button from '../../UI/Button/Button';
import * as actions from '../../../Store/actions/index';

class OrderSummary extends Component{
    render(){
        const ingredientSummary= Object.keys(this.props.ingredients)
        .map(igKey => {
            return (<li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {this.props.ingredients[igKey]}
                </li>)
        });

        const handleOnChange = () => {
          this.props.onFavClicked(this.props.isFav);
        };
        return(
            <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>{ingredientSummary}</ul>
            <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
            <p>Complete your meal with...<br/></p><hr/>
            <p><input type="checkbox" id="fav" name="fav"
          onChange={handleOnChange} /> Add To Favourites</p>
            <p>Continue to Checkout?</p>
            <Button btnType="Danger" clicked={this.props.purchaseCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={this.props.purchaseContinued}>CONTINUE</Button>
        </Aux>
        )
    }
}

const mapStateToProps = state =>{
    return{
       isFav:state.order.isFav 
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFavClicked:(isFav) =>dispatch(actions.favClicked(isFav))
    }}

export default connect(mapStateToProps, mapDispatchToProps)(OrderSummary);