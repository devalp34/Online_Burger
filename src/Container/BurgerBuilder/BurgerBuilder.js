import React, {Component} from 'react';
import {connect} from 'react-redux';

import More from '../../hoc/More';
import Burger from '../../Component/Burger/Burger';
import BuildControls from '../../Component/Burger/BuildControls/BuildControls';
import Modal from '../../Component/FrontEnd/Model/Model';
import OrderSummary from '../../Component/Burger/OrderSummary/OrderSummary';
import axios from '../../Axios';
import Spinner from '../../Component/FrontEnd/Spinner/Spinner';
import WithErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as burgerConstructAction from '../../Store/Action/index';




class BurgerBuilder extends Component {

    state = {
        shopping :false,
    }

    componentDidMount (){
        this.props.onInitIngrediant()
    }

    purchasableIngrediant = (ingrediant) => {
        const sum = Object.keys(ingrediant)
                    .map(igkey => {
                        return ingrediant[igkey];
                    })
                      .reduce((sum,el) => {
                        return sum + el
                      },0);

        return sum > 0;
    }

    purchaseHandler = () => {
        if(this.props.token){
            this.setState({shopping : true})
        }else {
            this.props.onAuthRedirect("/checkout")
            this.props.history.push('/auth')
        }
    }

    purchaseCancelHandler = () => {
        this.setState({shopping : false})
    }

    purchaseContinueHandler = () => {
        this.props.onBurgerInit()
        this.props.history.push("/checkout")
    }


    render(){
        const disabledInfo = {
            ...this.props.ing
        }

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        if(this.props.ing){
            orderSummary = <OrderSummary 
                                ingrediant = {this.props.ing}
                                continue = {this.purchaseContinueHandler}
                                cancel = {this.purchaseCancelHandler}
                                price = {this.props.price}/>
        }

        let burger = this.props.err ? <p> Ur Ingrediant cant be loaded</p> : <Spinner />
        if(this.props.ing){
            burger =<More>
                        <Burger ingrediant = {this.props.ing}/>
                        <BuildControls  
                            addItem = { (type) => this.props.onAddIngrediant(type)}
                            removeItem = {(type) => this.props.onRemoveIngrediant(type)}
                            price = {this.props.price}
                            purchasable = {this.purchasableIngrediant(this.props.ing)}
                            disabled = {disabledInfo}
                            isOk = {this.props.token}
                            clicked = {this.purchaseHandler}/> 
                    </More>
        }

        return (
                <More>
                    <Modal show = {this.state.shopping}
                            modalClick = {this.purchaseCancelHandler}>
                            {orderSummary}
                    </Modal>
                    {burger}
                </More>    
        )
    }
}

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingrediant,
        price : state.burgerBuilder.totalPrice,
        err : state.burgerBuilder.error,
        token : state.auth.token !== null
    };
}

const mapActionToProps = dispatch => {
    return{
        onAddIngrediant : (ingName) => dispatch(burgerConstructAction.addIngrediant(ingName)),
        onRemoveIngrediant : (ingName) => dispatch(burgerConstructAction.removeIngrediant(ingName)),  
        onInitIngrediant : () => dispatch(burgerConstructAction.initIngrediant()),
        onBurgerInit : () => dispatch(burgerConstructAction.burgerInit()),
        onAuthRedirect : (path) => dispatch(burgerConstructAction.authSetRedirect(path))
    }
}

export default connect(mapStateToProps,mapActionToProps)(WithErrorHandler(BurgerBuilder,axios));