import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSucces = (id, orderData) =>{
    return{
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData:orderData
    }
}

export const purchaseBurgerFail = (error) =>{ //synchronous
    return{
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () =>{ 
    return{
        type: actionTypes.PURCHASE_BURGER_START,
    }
}

export const purchaseInit = () =>{ 
    return{
        type: actionTypes.PURCHASE_INIT,
    }
}

export const purchaseBurger = (orderData) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData)
            .then(response => {
               console.log(response.data);
               dispatch(purchaseBurgerSucces(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
}          //asynchronous

export const fetchOrderSucces = ( orders) =>{
    return{
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders  : orders
    }
}

export const fetchOrderFail = (error) =>{ //synchronous
    return{
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    }
}

export const fetchOrderStart = () =>{ 
    return{
        type: actionTypes.FETCH_ORDERS_START,
    }
}

export const fetchOrder = () =>{ 
    return dispatch =>{
        dispatch(fetchOrderStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrderSucces(fetchedOrders))
                // this.setState({loading: false, orders: fetchedOrders});
            })
            .catch(err => {
                // this.setState({loading: false});
                dispatch(fetchOrderFail(err))
            });
    }
}
