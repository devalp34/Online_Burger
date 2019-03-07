import React,{Component} from 'react';
import {connect} from "react-redux";

import More from '../../hoc/More'
import Classes from './Layout.module.css';
import Toolbar from '../Directions/Toolbar/Toolbar';
import SideDrawer from '../Directions/SideDrawer/SideDrawer';

class Layout extends Component{
    state = {
        ShowDrawer : true,
    }

    SDCloseHandler = () => {
        this.setState ({ShowDrawer : false});
        console.log("From Handler",this.state.ShowDrawer)
    }

    clickHanadler = () => {
        this.setState((prevState) => {
            return {ShowDrawer : !prevState.ShowDrawer}
    })
}

    render() {
        return (
            <More>
                <Toolbar
                    click = {this.clickHanadler}
                    btn = {this.state.toggleButton}
                    isOk = {this.props.isAuthanticate}/> 
                <SideDrawer
                    open = {this.state.ShowDrawer} 
                    clicked = {this.SDCloseHandler}
                    isOk = {this.props.isAuthanticate}/>
            <main className = {Classes.Content}> 
                {this.props.children} 
            </main>
          </More> 
        )
    }
}; 

const mapStateToProps = state => {
    return{
        isAuthanticate : state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);