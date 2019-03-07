import React,{Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Button from '../../Component/FrontEnd/Button/Button';
import Input from '../../Component/FrontEnd/Input/Input';
import classes from './Auth.module.css'
import * as actionType from '../../Store/Action/index';
import Spinner from '../../Component/FrontEnd/Spinner/Spinner';


class Auth extends Component{
    state = {
        controls : {
            email : {
                elementType : "Input",
                elementConfig : {
                    type : "email",
                    placeholder : "Mail Address"
                },
                value : "",
                validation : {
                    required : true,
                    isEmail : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : "Input",
                elementConfig : {
                    type : "password",
                    placeholder : "Password"
                },
                value : "",
                validation : {
                    required : true,
                    minLength : 5
                },
                valid : false,
                touched : false
            },
        },
        isSignedup : true
    }

    componentDidMount () {
        if(!this.props.redirectPath && this.props.buildingBurger !== '/'){
            this.props.onSetRedirectPath()
        }
    }

    checkValidity = (value,rules) => {
        let isValid = true
        
        if(!rules){
            return true;
        }

        if(rules.required){
            isValid = value.trim() !== "" && isValid; 
        }

        if(rules.minLength){
            isValid = value.length >= rules.minLength && isValid; 
        }

        if(rules.maxLength){
            isValid = value.length <= rules.maxLength && isValid; 
        }
        return isValid;
    }
    
    onChangeHandler = (event,controlName) => {
        const updateControl = {
            ...this.state.controls,
            [controlName] : {
                ...this.state.controls[controlName],
                value : event.target.value,
                valid : this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched : true,
            }
        }
        this.setState({controls : updateControl})
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.toAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignedup)
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignedup : !prevState.isSignedup}
        })
    }

    render(){
        let fetchArray = []
        for(let temp in this.state.controls){
            fetchArray.push({
                id : temp,
                config : this.state.controls[temp]
            })
        }

        let form = fetchArray.map(formElement => (
                            <Input  key = {formElement.id}
                                    elementType = {formElement.config.elementType}
                                    elementConfig = {formElement.config.elementConfig}
                                    value = {formElement.config.value}
                                    invalid = {!formElement.config.valid}
                                    touched = {formElement.config.touched}
                                    change = {(event) => this.onChangeHandler(event,formElement.id)}/>
        )) 

        if(this.props.loading){
            form = <Spinner />
        }

        let errorMessage = null;
        if(this.props.error) {
           errorMessage = (
            <p> {this.props.error.message} </p>
            );
        } 
        
        let authDirect = null
        if(this.props.token){
            authDirect = <Redirect to = {this.props.redirectPath} />
        }
        // console.log("Your Message is ",this.props.error.message)

        return(
            <div className = {classes.Auth}>
                {authDirect}
                {errorMessage}
                <form onSubmit = {this.submitHandler}>
                    {form}
                    <Button btnType = "Success"> Submit It! </Button>
                </form>
                <Button click = {this.switchAuthModeHandler}
                        btnType = "Danger">Switch To {this.state.isSignedup ? "SignIn" : "SignUp"}</Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        token : state.auth.token !== null,
        buildingBurger : state.burgerBuilder.building,
        redirectPath : state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return{
        toAuth : (email,password,isSignedup) => dispatch(actionType.auth(email,password,isSignedup)),
        onSetRedirectPath : () => dispatch(actionType.authSetRedirect('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);