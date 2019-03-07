import React from 'react';
import BurgerLogo from '../../Assests/Image/BurgerLogo.png';
import classes from './Logo.module.css';

const Logo = (props) => (
    <div className = {classes.Logo} style = {{height : props.height,margin : props.margin}}>
        <img src = {BurgerLogo} alt = "MyBurger"/>
    </div>
)

export default Logo;