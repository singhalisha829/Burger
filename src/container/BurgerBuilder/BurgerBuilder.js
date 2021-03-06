import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux";
import Burger from "../../components/Burger/Burger";
import classes from '../BurgerBuilder/BurgerBuilder.css';
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import errorHandler from "../../hoc/ErrorHandler/ErrorHandler";
import * as burgerBuilderActions from '../../Store/actions/index';

// const INGREDIENT_PRICES={
//     salad: 0.5,
//     cheese:0.4,
//     meat:1.3,
//     bacon:0.7
// };

class BurgerBuilder extends Component{

    state={
        purchasing:false,
        // loading: false,
        // error:false
    }

    componentDidMount(){
        this.props.onInitIngredients();
        // axios.get('https://my-burger-3b88c-default-rtdb.firebaseio.com/ingredients.json')
        // .then(response =>{
        //     this.setState({ingredients: response.data})
        // })
        // .catch(error=>{
        //     this.setState({error:true})
        // })
    }
    updatePurchaseState (ingredients) {
        const sum= Object.keys(ingredients)
        .map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum,el) =>{
            return sum + el;
        }, 0);
        return sum>0;
    }
    // addIngredientHandler = (type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     const updatedCount= oldCount+1;
    //     const updatedIngredients= {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const priceAddition= INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice+priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    // removeIngredientHandler= (type) =>{
    //     const oldCount = this.state.ingredients[type];
    //     if(oldCount <= 0){
    //         return;
    //     }
    //     const updatedCount= oldCount-1;
    //     const updatedIngredients= {
    //         ...this.state.ingredients
    //     };
    //     updatedIngredients[type]= updatedCount;
    //     const priceAddition= INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice-priceAddition;
    //     this.setState({totalPrice:newPrice, ingredients: updatedIngredients})
    //     this.updatePurchaseState(updatedIngredients);
    // }

    purchaseHandler =() => {
        if(this.props.isAuthenticated){
            this.setState({purchasing: true})
        }else{
            this.props.onSetAuthRedirectPath('checkout');
            this.props.history.push('/auth')
        }
        
    }

    purchaseCancelHandler =() => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () =>{
        // this.setState({loading:true})
        // const order ={
        //     ingredients: this.state.ingredients,
        //     price: this.state.totalPrice,
        //     customer:{
        //         name:"Alisha Singh",
        //         address:{
        //             street:'test street',
        //             zipCode:'827001',
        //             country:'India'
        //         },
        //         email:'test@test.com'
        //     },
        //     deliveryMethod:'fastest'
        // }
        // axios.post('/orders.json',order)
        // .then(response => {
        //     this.setState({loading:false, purchasing:false})
        // })
        // .catch(error => {
        //     this.setState({loading:false, purchasing:false})
        // });
        // const queryParams = [];
        // for(let i in this.state.ingredients){
        //     queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        // }
        // queryParams.push('price='+this.state.totalPrice)
        // const queryString= queryParams.join('&')
        // this.props.history.push({
        //     pathname:'/checkout',
        //     search:'?' + queryString
        // });
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    render(){
        const disabledInfo= {
            ...this.props.ings
        };
        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }
        let orderSummary=null;   
        
        let burger=this.props.error? <p>Ingredients can't be loaded!</p> : <Spinner />;
        if(this.props.ings){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings}/>
                <BuildControls 
                ingredientAdded={this.props.onIngredientAdded}
                ingredientRemoved={this.props.onIngredientRemoved}
                disabled={disabledInfo}
                purchaseable={this.updatePurchaseState(this.props.ings)}
                ordered= {this.purchaseHandler}
                isAuth={this.props.isAuthenticated}
                price={this.props.price}/>
                </Aux>
            );
            orderSummary=<OrderSummary 
            ingredients={this.props.ings}
            purchaseCanceled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            price={this.props.price}/>;
        }

        // if(this.state.loading){
        //     orderSummary= <Spinner />
        // }
        return(
            <Aux>
                <Modal style={classes.modal} show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                   {orderSummary} 
                </Modal>
                {burger}
            </Aux>
        )
    }
}

const mapStateToProps= state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        error:state.burgerBuilder.error,
        isAuthenticated:state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onIngredientAdded:(ingName) => dispatch(burgerBuilderActions.addIngredient(ingName)),
        onIngredientRemoved:(ingName) => dispatch(burgerBuilderActions.removeIngredient(ingName)),
        onInitIngredients:() => dispatch(burgerBuilderActions.initIngredients()),
        onInitPurchase :() => dispatch(burgerBuilderActions.purchaseInit()),
        onSetAuthRedirectPath:(path) => dispatch(burgerBuilderActions.setAuthRedirectPath(path))
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(BurgerBuilder, axios));