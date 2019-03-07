import React from 'react';
import classes from './DirectionItem.module.css';
import {NavLink} from 'react-router-dom';

const DirectionItem = (props) => (
    <li className = {classes.DirectionItem}> 
        <NavLink to = {props.link}
                exact
                activeClassName = {classes.active}>{props.children}</NavLink>
    </li>
)

export default DirectionItem;