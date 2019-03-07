import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const control = [
    {label: 'Salad',type : 'salad'},
    {label: 'Meat',type : 'meat'},
    {label: 'Cheese',type : 'cheese'},
    {label: 'Bacon',type : 'bacon'}
]

const BuildControls = (props) => {

    if(props.isOk){
      let temp = <p> Please Sign Up First </p>
    }
    return (
        <div className = {classes.BuildControls}>
        <p> Your total price is $ <strong>{props.price}</strong></p>
        {control.map(ctrl => {
            return <BuildControl 
                        key = {ctrl.label} 
                        label = {ctrl.label} 
                        addedItem = {() => props.addItem(ctrl.type)}
                        removedItem = {() => props.removeItem(ctrl.type)}
                        priced = {props.price}
                        disabled = {props.disabled[ctrl.type]}/>
        })}
        <button className = {classes.OrderButton}
                disabled = {!props.purchasable}
                onClick = {props.clicked}> 
                {props.isOk ? "Order It!" : "Sign Up"}</button>
    </div>
    )
}

export default BuildControls;