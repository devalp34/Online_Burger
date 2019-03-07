import React from 'react';
import Logo from '../../Logo/Logo';
import DirectionItems from '../DirectionItems/DirectionItems';
import classes from './SideDrawer.module.css';
import BackDrop from '../../FrontEnd/BackDrop/BackDrop';
import More from '../../../hoc/More';


const SideDrawer = (props) => {
    let newStatus = [classes.SideDrawer,classes.Close]
    if(props.open){
        newStatus = [classes.SideDrawer,classes.Open]
    }

    return(
        <More>
            <BackDrop 
                show = {props.open}
                click = {props.clicked} />
        <div className = {newStatus.join(' ')} onClick = {props.clicked}>
            <Logo height = "11%" 
                  margin = "32px"/>
                <DirectionItems isOk = {props.isOk}></DirectionItems>
        </div>
        </More>
    )
}

export default SideDrawer;