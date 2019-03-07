import React ,{Component} from 'react';
import {Route , Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from '../ContactData/ContactData';
import CheckoutSummary from '../../Component/Order/CheckoutSummary';
import * as orderActionType from '../../Store/Action/index';

class CheckOut extends Component {
    
    // componentWillMount() {
    //     this.props.onBurgerInit()
    // }

    onCheckoutCanceclled = () => {
        console.log("from go back")
        this.props.history.goBack()
    }

    onCheckoutContinued = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render() {
        let summary = <Redirect to = "/" />
        if(this.props.ing){
            const purchaseRedirect = this.props.purchase ? <Redirect to = "/" /> : null
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary 
                            ingrediant = {this.props.ing}
                            checkoutCancelled = {this.onCheckoutCanceclled}
                            checkoutContinued = {this.onCheckoutContinued}/>
                    <Route path = {this.props.match.path + "/contact-data"}
                            component = {ContactData}/>
                </div>
            );
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return{
        ing : state.burgerBuilder.ingrediant,
        purchase : state.order.purchased
    }
}

// const mapDispatchToProps = dispatch => {
//     return{
//         onBurgerInit : () => dispatch(orderActionType.burgerInit())
//     }
// }

export default connect(mapStateToProps)(CheckOut);