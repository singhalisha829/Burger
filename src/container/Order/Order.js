import React,{ Component } from "react";

import Orders from "../../components/UI/Order/Order";

class Order extends Component{
    render(){
        return(
            <div>
                <Orders />
                <Orders />
            </div>
        )
    }
}

export default Order;