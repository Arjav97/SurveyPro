import React , { Component } from 'react';
import classes from './Logout.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import * as UIkit from 'uikit';
import Aux from '../../../hoc/Auxi';
import { withRouter } from 'react-router-dom';

class Logout extends Component{

    submitHandler = () => {
        this.props.logOut( () => {
            UIkit.notification({
                message: '<span uk-icon=\'icon: check\'></span> Logged Out Successfully!!!',
                status : 'success',
                pos: 'top-center'})
        })
        this.props.history.push('/')
    }
    
    render(){
   
        console.log(this.props)
        return (
            <Aux>
            <button className={["uk-button uk-button-danger",classes.Logout].join(" ")} uk-tooltip="Sign Out" onClick={this.submitHandler}>LogOut</button>
            </Aux>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logOut : (callback) => dispatch(actions.authLogout(callback))
    }
}

export default withRouter(connect(null , mapDispatchToProps)(Logout));