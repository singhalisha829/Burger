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

export const favClicked = (isFav) =>{
    return{
        type:actionTypes.FAV_CLICKED,
        isFav:isFav
    }
}

export const setCoke = (isCoke) =>{
    return{
        type:actionTypes.IS_COKE,
        isCoke:isCoke
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

export const purchaseBurger = (orderData, token) =>{
    return dispatch =>{
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth='+token,orderData)
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

export const fetchOrder = (token, userId) =>{ 
    return dispatch =>{
        dispatch(fetchOrderStart());
        const queryParams= '?auth='+ token + '&orderBy="userId"&equalTo="'+ userId + '"';
        axios.get('/orders.json'+queryParams)
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
                console.log(err);
                dispatch(fetchOrderFail(err))
            });
    }
}
