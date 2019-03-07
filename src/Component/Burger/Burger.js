import React, {Component} from 'react';
import BurgerIngrediant from './BurgerIngrediant/BurgerIngrediant';
import classes from './Burger.module.css';

const Burger = (props) => {
    let newIngrediant = Object.keys(props.ingrediant)
                          .map(igKey => {
                              return [...Array(props.ingrediant[igKey])]
                              .map((_,i) => {
                                  return <BurgerIngrediant type={igKey} key = {igKey + i} />
                              })
                          }).reduce((arr,el) => {
                                return arr.concat(el)
                          },[])

    console.log(newIngrediant);
       
    if(newIngrediant.length === 0){
        newIngrediant = <p> Please start to take some ingrediant! </p>
    }

    return(
        <div className = {classes.Burger}>
            <BurgerIngrediant type = "bread-top" />
            {newIngrediant}
            <BurgerIngrediant type = "bread-bottom" />
        </div>
    )
}

export default Burger;