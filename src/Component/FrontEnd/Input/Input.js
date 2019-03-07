import React from 'react';
import classes from './Input.module.css';

const Input = (props) => {
    
    let inputElement = null;
    let inputClasses = [classes.Input];

    if(props.invalid && props.touched){
        inputClasses.push(classes.Invalid)
    }


    switch(props.elementType){
        case ("Input"):
            inputElement = <input className={inputClasses.join(" ")} 
                                    {...props.elementConfig}
                                    value = {props.value}
                                    onChange = {props.change} />
            break;
        case ("Select"):
            inputElement = (<select 
                                className={classes.Select}
                                value = {props.value}
                                onChange = {props.change}>
                                {props.elementConfig.options.map(option => (
                                    <option
                                        key = {option.value} 
                                        value = {option.value}>
                                        {option.displayValue}
                                    </option>                                   
                                ))}
                                </select>)
            break;
        default :
            inputElement = <input className={inputClasses.join(" ")} 
                                    {...props.elementConfig}
                                    value = {props.value} 
                                    onChange = {props.change}/>
    }
    console.log("I am from input.js")
    
    return(

        <div className = {classes.Input}>
            {/* <label className = {classes.Label}>{props.name}</label> */}
            {inputElement}
        </div>
    )
}

export default Input