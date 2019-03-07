import React, {Component} from 'react';
import { connect } from 'react-redux';

import axios from '../../Axios';
import Button from '../../Component/FrontEnd/Button/Button';
import classes from './ContactData.module.css';
import Spinner  from '../../Component/FrontEnd/Spinner/Spinner';
import Input from '../../Component/FrontEnd/Input/Input';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as orderActionType from '../../Store/Action/index';

class ContactData extends Component{
    
    state = {
        orderForm : {
                name : {
                    elementType : "Input",
                    elementConfig : {
                        type : "text",
                        placeholder : "Your Name"
                    },
                    value : "",
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },

                street : {
                    elementType : "Input",
                    elementConfig : {
                        type : "text",
                        placeholder : "Your street"
                    },
                    value : "",
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                }, 
                Zipcode : {
                    elementType : "Input",
                    elementConfig : {
                        type : "text",
                        placeholder : "Zipcode"
                    },
                    value : "",
                    validation : {
                        required : true,
                        minLength : 5,
                        maxLength : 6
                    },
                    valid : false,
                    touched : false
                },
                country : {
                    elementType : "Input",
                    elementConfig : {
                        type : "text",
                        placeholder : "Country"
                    },
                    value : "",
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                email : {
                    elementType : "Input",
                    elementConfig : {
                        type : "email",
                        placeholder : "Email"
                    },
                    value : "",
                    validation : {
                        required : true
                    },
                    valid : false,
                    touched : false
                },
                deliveryMethod : {
                    elementType : "Select",
                    elementConfig : {
                        options: [
                            {value : "fastest", displayValue : "fastest"},
                            {value : "cheapest", displayValue : "cheapest"}
                        ]
                    },
                    validation : {},
                    value : "fastest",
                    valid : true
                },
            },    
        formIsValid : false,    
    }

    orderHandler = (event) => {
        event.preventDefault();
        // this.setState({loading : true})  
        const formData = {}
        for(let formIdentifier in this.state.orderForm){
            formData[formIdentifier] = this.state.orderForm[formIdentifier].value
        }

        const Order = {
            ingrediant : this.props.ing,
            price : this.props.price,
            orderData : formData,
            userId : this.props.userId
        }
        this.props.onOrderStart(Order,this.props.token)
        // this.props.history.push('/checkout')
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

    onChangeHandler = (event,identifier) => {
        
         const newForm = {
            ...this.state.orderForm
        }
        const newUpdatedForm = {
            ...newForm[identifier]
        }
        newUpdatedForm.value = event.target.value
        newUpdatedForm.valid = this.checkValidity(event.target.value,newUpdatedForm.validation)
        newUpdatedForm.touched = true
        newForm[identifier] = newUpdatedForm;
        //this.setState({orderForm : newForm}) 
        let formIsValid = true;
        for(let identifier in newForm){
            formIsValid = newForm[identifier].valid && formIsValid; 
        }
        //updatedForm
        console.log(formIsValid)
        this.setState({orderForm : newForm, formIsValid : formIsValid}) 
    }

    render(){
        const formElementArray = []
        for(let key in this.state.orderForm){
            formElementArray.push({
                id : key,
                config : this.state.orderForm[key]  
            })
        }

        let form = <form onSubmit = {this.orderHandler}>
                        {formElementArray.map(formElement => (
                            <Input  key = {formElement.id}
                                    elementType = {formElement.config.elementType}
                                    elementConfig = {formElement.config.elementConfig}
                                    value = {formElement.config.value}
                                    invalid = {!formElement.config.valid}
                                    touched = {formElement.config.touched}
                                    change = {(event) => this.onChangeHandler(event,formElement.id)}/>
                        ))}
                        <Button btnType = "Success"
                                disabled = {!this.state.formIsValid}> Order </Button>
                    </form>
        if(this.props.loading){
            form = <Spinner />
        }
        return(
            <div className = {classes.ContactData}>
             {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ing : state.burgerBuilder.ingrediant,
        price : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}

const mapActionToProps = dispatch => {
    return{
        onOrderStart : (orderData,token) => dispatch(orderActionType.burgerStart(orderData,token))
    }
}

export default connect(mapStateToProps,mapActionToProps)(withErrorHandler(ContactData,axios));