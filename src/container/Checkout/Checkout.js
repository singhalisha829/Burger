import React ,{ Component} from 'react';
import { Route , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import CheckoutSummary from '../../components/UI/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import * as actions from '../../Store/actions/index';

class Checkout extends Component{

    // state={
    //     ingredients:null,
    //     price:0
    // }

    // componentWillMount(){
    //     this.props.onInitPurchase();
    // }

    // componentWillMount(){
    //     const query = new URLSearchParams(this.props.location.search);
    //     const ingredients={};
    //     let price=0;
    //     for(let param of query.entries()){
    //         if(param[0] === 'price'){
    //             price=param[1];
    //         }else{
    //         ingredients[param[0]] = +param[1];
    //     }}
    //     this.setState({ingredients:ingredients, totalPrice:price});
    // }

    checkoutCancelledHandler =()=>{
        this.props.history.goBack();
    }

    checkoutContinuedHandler =() =>{
        this.props.history.replace('/checkout/contact-data');
    }
    render(){
        let summary= <Redirect to='/' />
        if(this.props.ings){
            const purchasedRedirect= this.props.purchased? <Redirect to='/' />: null;
            summary= (
            <div>
                {purchasedRedirect}
                <CheckoutSummary 
            ingredients={this.props.ings}
            checkoutContinued={this.checkoutContinuedHandler}
            checkoutCancelled = {this.checkoutCancelledHandler} 
            />
            <Route 
            path={this.props.match.path + '/contact-data'} 
            component={ContactData}/>
            </div>);
        }
        return summary;
    }
}

const mapStateToProps = state =>{
    return{
        ings:state.burgerBuilder.ingredients,
        purchased:state.order.purchased
    }
}

// const mapDispatchToProps = dispatch =>{
//     return{
//         onInitPurchase: ()=>dispatch(actions.purchaseInit())
//     }
// }

export default connect(mapStateToProps)(Checkout);