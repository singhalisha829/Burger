import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../shared/utility';

const initialState={
    orders:[],
    loading:false,
    purchased:false,
    isFav:false,
    isCoke:false
};

const reducer =(state=initialState, action) =>{
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state,{ purchased: false, isFav:false, isCoke:false });
        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state,{ loading:true });            
        case actionTypes.PURCHASE_BURGER_SUCCESS:
            const newOrder=updateObject(action.orderData,{id:action.orderId})
            return updateObject(state,{
                loading:false,
                purchased:true,
                isFav:false,
                isCoke:false,
                orders:state.orders.concat(newOrder)
            })
        case actionTypes.FAV_CLICKED:
            return updateObject(state, { isFav: !action.isFav});
        case actionTypes.IS_COKE:
            return updateObject(state, { isCoke: !action.isCoke});
        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state,{ loading:false, isFav:false ,isCoke:false});
        case actionTypes.FETCH_ORDERS_START:
            return updateObject(state,{ loading:true, isFav:false ,isCoke:false });
        case actionTypes.FETCH_ORDERS_SUCCESS:
            return updateObject(state,{ orders:action.orders , loading:false});
        case actionTypes.FETCH_ORDERS_FAIL:
            return updateObject(state,{ loading:false });
        default:
            return state;
    }
}

export default reducer;