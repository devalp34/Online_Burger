import React from 'react';
import classes from './DirectionItems.module.css';
import DirectionItem from './DirectionItem/DirectionItem';

const DirectionItems = (props) => (
    <ul className = {classes.DirectionItems}> 
        <DirectionItem link = "/" > BurgerBuilder</DirectionItem>
        {props.isOk ? <DirectionItem link = "/orders" > Orders </DirectionItem> : null}
        {!props.isOk ? <DirectionItem link = "/auth" > Log In </DirectionItem>
                    : <DirectionItem link = "/logout" > Log Out </DirectionItem>}
    </ul>
)

export default DirectionItems;