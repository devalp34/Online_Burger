import React, {Component} from 'react';
import classes from './Model.module.css'
import BackDrop from '../BackDrop/BackDrop';
import More from '../../../hoc/More';

class modal extends Component {

    shouldComponentUpdate (nextProps,nextState) {
        return nextProps.show !== this.props.show || nextProps.children !== this.props.children
    }

    componentWillUpdate = () => {
        console.log("Model Has Been Rendered!");
    }
    render() {
     return(
        <More>
        <BackDrop show = {this.props.show}
                  click = {this.props.modalClick}/>
    <div 
        className = {classes.Modal}
        style = {{
            transform : this.props.show ? "translateY(0)" :"translateY(-100vh)",
            opacity : this.props.show ? "1" : "0"
        }}>
        {this.props.children}
    </div>
    </More>
     )
 }   
}


export default modal;