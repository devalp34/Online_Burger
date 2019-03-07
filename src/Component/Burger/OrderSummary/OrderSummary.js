import React from 'react';
import More from '../../../hoc/More';
import Button from '../../FrontEnd/Button/Button';


const OrderSummary = (props) => {
    const IngrediantSummary = Object.keys(props.ingrediant)
                            .map(igKey => {
                                return( 
                                <li key = {igKey}> 
                                    <span style = {{textTransform : "capitalize"}}>{igKey}</span>= {props.ingrediant[igKey]} 
                                </li>)
                            })

    return(
        <More>
            <h3> Your order!</h3>
            <p> Magic Burger is containing following Ingrediant</p>
            <ul>
                {IngrediantSummary}
            </ul>
            <p><strong> Your Total Price is {props.price.toFixed(2)}!</strong></p>
            <p> Continue Checkout?</p> 
            <Button btnType = "Success" 
                    click = {props.continue}> Continue </Button>
            <Button btnType = "Danger" 
                    click = {props.cancel}> Cancel </Button> 
        </More>
    )
}

export default OrderSummary;