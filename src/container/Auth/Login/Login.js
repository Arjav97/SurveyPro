import React , { Component } from 'react';
import classes from './Login.module.css';
import Aux from '../../../hoc/Auxi';
import { Link } from 'react-router-dom';
import { updateObject , checkValidity } from '../../../shared/utility'
import * as UIkit from 'uikit';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';

class Login extends Component{

    state = {
        controls:{
            username: {
                value: '',
                validation: {
                    required: true,
                    isMail: true
                },
                valid: false
            },
            password:{
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false
            }
        },
        formisValid: false
    }

    inputChangedHandler = ( event , controlName ) => { 
        const updatedControls = updateObject(this.state.controls , {
            [controlName] : updateObject(this.state.controls[controlName] , {
                value: event.target.value,
                valid: checkValidity(event.target.value , this.state.controls[controlName].validation),
                touched: true
            })
        })
        let formisValid = true;
        for (let inputIdentifier in updatedControls){
            formisValid = updatedControls[inputIdentifier].valid & formisValid
        }
        this.setState({controls: updatedControls , formisValid : formisValid})
    }

    submitHandler = () => {
        if(this.state.formisValid){
            this.props.loginCheck(this.state.controls.username.value , this.state.controls.password.value , (res) => {
                
                if(res.success==="false"){
                    UIkit.notification({
                        message: '<span uk-icon=\'icon: close\'></span> Wrong Credentials',
                        status : 'danger',
                        pos: 'top-center'
                    })
                }
                else if(res.success==="true"){
                    UIkit.notification({
                        message: '<span uk-icon=\'icon: check\'></span> Login Successful!!!',
                        status : 'success',
                        pos: 'top-center'
                    })
                    if(res.doc.account === "Customer")
                        this.props.history.push('/customer')
                    else
                        this.props.history.push('/admin')
                }
            })
        }
        else{
            UIkit.notification({
                message: '<span uk-icon=\'icon: close\'></span> Validation Error',
                status : 'danger',
                pos: 'top-center'
            })
        }
    }
     
    render(){

    return(

    <Aux>
    <div className={classes.main}>
        <div id="heading">
            <legend className="uk-legend uk-margin-medium-left uk-margin-medium-bottom uk-text-center uk-width-1-4">Login</legend>
        </div>
    
        <div className="uk-margin uk-margin-small-left">
            <label className="uk-form-label uk-text-emphasis uk-text-large">Username</label>
            <div className="uk-form-controls uk-width-medium" >
                <input className={["uk-input",classes.credentials].join(" ")} uk-tooltip="title:Email;pos:top-right" name="username" type="text" placeholder="Enter Username" value={this.state.username} onChange={(event) => this.inputChangedHandler(event , "username")} />
            </div>
        </div>

        <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Password</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="password" name="password" placeholder="Enter the password" value={this.state.password} onChange={(event) => this.inputChangedHandler(event, "password")} />
                </div>
        </div>

        <div className="uk-child-width-1-3 uk-margin-small-left uk-margin-medium-top">
            <button className="uk-button uk-button-large uk-button-primary" uk-tooltip="title:Login;pos:top-right" type="button" onClick={this.submitHandler}>Sign In</button>
        </div>

        <div className="uk-margin uk-margin-small-left uk-margin-medium-top"> 
            <Link to="/register">Don't have an account? Sign Up Now <span uk-icon="icon:sign-in;ratio:2"></span></Link>
        </div>
        
    </div>
    </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loginCheck : (username , password , callback ) => dispatch(actions.authLogin(username , password , callback))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Login);