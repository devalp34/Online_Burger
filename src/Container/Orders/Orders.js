import React , {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../Component/Order/Order'
import axios from '../../Axios';
import Spinner from '../../Component/FrontEnd/Spinner/Spinner';
import * as action from '../../Store/Action/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component{

    componentDidMount() {
        this.props.onOrderFetch(this.props.token,this.props.userId)
    }
    render() {
        let orders = <Spinner />
        if(!this.props.loading){
            orders = this.props.orders.map(order =>(
                    <Order
                        key = {order.id} 
                        ingrediants = {order.ingrediant}
                        price = {+order.price}/>
                ))
        }
        console.log("Auth Token :",this.props.token)
        return(
            <div> 
                {orders}                
            </div>
        )
    }
}

const mapStateToProp = state => {
    return{
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return{
        onOrderFetch : (token,userid) => dispatch(action.fetchOrder(token,userid))
    }
} 

export default connect(mapStateToProp,mapDispatchToProps)(withErrorHandler(Orders,axios))