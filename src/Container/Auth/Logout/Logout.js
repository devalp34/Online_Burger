import React , {Component} from 'react';
import {connect} from 'react-redux';
import { Redirect} from 'react-router-dom';

import * as actionType from '../../../Store/Action/index';

class Logout extends Component{
    
    componentDidMount () {
        this.props.onLogout()
    }

    render(){
        return<Redirect to = "/" />
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout : () => dispatch(actionType.logOut())
    }
}

export default connect(null, mapDispatchToProps)(Logout);