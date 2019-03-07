import React, { Component } from 'react';
import {Route,
        Switch,
        withRouter,
        Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Layout from './Component/Layout/Layout';
import './App.module.css';
import BurgerBuilder from './Container/BurgerBuilder/BurgerBuilder';
import CheckOut from './Container/CheckOut/CheckOut';
import Orders from './Container/Orders/Orders';
import Auth from './Container/Auth/Auth';
import Logout from './Container/Auth/Logout/Logout';
import * as action from './Store/Action/index';
//import asyncComponent from './hoc/asynCode/asyncComponent';

// const asyncCheckout = asyncComponent(() => {
//   return('./Container/CheckOut/CheckOut')
// })

// const asyncOrder = asyncComponent(() => {
//   return('./Container/Orders/Orders')
// })

// const asyncAuth = asyncComponent(() => {
//   return('./Container/Auth/Auth')
// })


class App extends Component {

  componentDidMount () {
    this.props.onAuthCheckState()
  }

  render() {
    let routes = (
      <Switch>
        <Route path = "/auth" component = {Auth} /> 
        <Route path = "/" exact component = {BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
    )

    if(this.props.isOk){
      routes = (
        <Switch>
          <Route path = "/checkout" component = {CheckOut} /> 
          <Route path = "/orders" exact component = {Orders} />
          <Route path = "/logout" exact component = {Logout} />
          <Route path = "/auth" component = {Auth} /> 
          <Route path = "/" exact component = {BurgerBuilder} />
          <Redirect to = "/" />
        </Switch>
      )
    }

    return (
      <div>
      <Layout>
        {routes}
        {/* <Switch>
         <Route path = "/checkout" component = {CheckOut} /> 
          <Route path = "/orders" exact component = {Orders} />
          <Route path = "/logout" exact component = {Logout} />
          <Route path = "/auth" component = {Auth} /> 
          <Route path = "/" exact component = {BurgerBuilder} />
        </Switch> */}
      </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return{
    isOk : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return{
    onAuthCheckState : () => dispatch(action.authCheckState())
  } 
}
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
