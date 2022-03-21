import React, { Component} from 'react';

import Order from '../../components/UI/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';
import fav from '../../assets/images/fav.png';
import classes from '../Favourites/Favourites.css';

import Spinner from '../../components/UI/Spinner/Spinner';



class Favourites extends Component{

    onFavPage=true
    componentDidMount(){
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }
    render(){
        let order= <Spinner />
        let favOrders=[]
        for(let i=0;i<this.props.orders.length;i++){
            if(this.props.orders[i].isFav === true){
                favOrders.push(this.props.orders[i])
            }
        }
        if(favOrders){
            order=(<div>
                {favOrders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} 
                        onFavPage={this.onFavPage}
                        />
                ))}
            </div>)
        }
        if(favOrders.length === 0){
            order=(<div className={classes.fav}>
                <img src={fav}/>
                <p>No Favourites Yet!<space/>;(</p>
            </div>)
        }
        return order;
    }
}

const mapStateToProps= state =>{
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onFetchOrders:(token , userId) => dispatch(actions.fetchOrder(token , userId))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Favourites);