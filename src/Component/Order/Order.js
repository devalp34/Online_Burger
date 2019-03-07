import React from 'react';
import classes from './Order.module.css'

const Order = (props) => {
    
    const Ingrediants = []
    for(let ingrediantsName in props.ingrediants){
        Ingrediants.push({
            name : ingrediantsName,
            value : props.ingrediants[ingrediantsName]
        })
    }

    const outputIngrediant = Ingrediants.map(ig => {
        return <span style = {{
                    textTransform : "capitalize",
                    display : "inline-block",
                    margin : "3px 8px",
                    border : "2px solid #ccc",
                    padding : "6px", 
                }}key = {ig.name}> {ig.name} ({ig.value})</span>
    })
    return(
        <div className = {classes.Order}>
            <p> Ingrediants : {outputIngrediant}</p>
            <p> Price : <strong> ${props.price.toFixed(2)} </strong></p>
        </div>
    )
}

export default Order