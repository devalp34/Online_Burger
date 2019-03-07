import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className = {classes.BuildControl}>
        <div className = {classes.label}>{props.label}</div>
        <button className = {classes.More} 
                onClick = {props.addedItem}> More </button>
        <button className = {classes.Less} 
                onClick = {props.removedItem}
                disabled = {props.disabled}> Less </button>
    </div>
)

export default BuildControl;