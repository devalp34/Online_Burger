import React from 'react';
import Burger from '../Burger/Burger';
import Button from '../FrontEnd/Button/Button';
import Classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return (
        <div className = {Classes.CheckoutSummary}>
            <h1> We hope the burger is very good!</h1>
            <div style = {{width : '100%' , margin : 'auto' }}>
                <Burger ingrediant = {props.ingrediant} />
            </div>
            <Button btnType = "Danger"
                    click = {props.checkoutCancelled}> Check Out </Button>
            <Button btnType = "Success"
                    click = {props.checkoutContinued}> Continue </Button>
        </div>
    )
}

export default CheckoutSummary;