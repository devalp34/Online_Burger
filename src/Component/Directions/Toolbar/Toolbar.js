import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import DirectionItems from '../DirectionItems/DirectionItems';
import SideDrawer from '../SideDrawer/SideDrawer';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

const Toolbar = (props) => (
    <header className = {classes.Toolbar}> 
        <DrawerToggle 
            click = {props.click}/> 
        <Logo height = "80%"/> 
        <nav className = {classes.DesktopOnly}>
            <DirectionItems isOk = {props.isOk}/>
        </nav>
    </header>
)

export default Toolbar