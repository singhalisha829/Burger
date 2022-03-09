import React, { Component } from 'react';

import Order from '../../components/UI/Order/Order';
import axios from '../../axios-orders';
import errorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as actions from '../../Store/actions/index';
import { connect } from 'react-redux';

import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    // state = {
    //     orders: [],
    //     loading: true
    // }

    componentDidMount() {
        // axios.get('/orders.json')
        //     .then(res => {
        //         const fetchedOrders = [];
        //         for (let key in res.data) {
        //             fetchedOrders.push({
        //                 ...res.data[key],
        //                 id: key
        //             });
        //         }
        //         this.setState({loading: false, orders: fetchedOrders});
        //     })
        //     .catch(err => {
        //         this.setState({loading: false});
        //     });
        this.props.onFetchOrders(this.props.token, this.props.userId);
    }

    render () {
        let order= <Spinner />
        if(this.props.orders){
            order=(<div>
                {this.props.orders.map(order => (
                    <Order 
                        key={order.id}
                        ingredients={order.ingredients}
                        price={order.price} />
                ))}
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

export default connect(mapStateToProps,mapDispatchToProps)(errorHandler(Orders, axios));