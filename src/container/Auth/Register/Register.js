import React , {Component} from 'react';
import classes from './Register.module.css';
import Aux from '../../../hoc/Auxi';
import { updateObject , checkValidity } from '../../../shared/utility'
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import UIkit from 'uikit';
import Spinner from '../../../component/UI/Spinner/Spinner'; 

class Register extends Component {

    state = {
        controls:{
            name: {
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
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
            },
            account:{
                value:'Customer',
                validation:true,
                valid:true
            }
        },
        formisValid: false
    }

    inputChangedHandler = ( event , controlName ) => { 
        const updatedControls = updateObject(this.state.controls , {
            [controlName] : updateObject(this.state.controls[controlName] , {
                value:event.target.value,
                valid: checkValidity(event.target.value,this.state.controls[controlName].validation),
                touched: true
            })
        })

        let formisValid = true;
        for(let inputidentifier in updatedControls){
            formisValid = updatedControls[inputidentifier].valid && formisValid 
        }
        this.setState({controls: updatedControls , formisValid: formisValid })
    }

    submitHandler = () => {
        if(this.state.formisValid){
            this.props.registerCheck(this.state.controls.name.value , this.state.controls.username.value , this.state.controls.password.value , this.state.controls.account.value , (res) =>{
                if(res.success === "true" ){
                    this.props.history.push('/')
                    UIkit.notification({
                    message: '<span uk-icon=\'icon: check\'></span> Registered Successfully!!!!',
                    status : 'success',
                    pos: 'top-center'
                    })
                }
                else if(res.success === "false"){
                    UIkit.notification({
                        message: '<span uk-icon=\'icon: close\'></span> Username already exists!!!!',
                        status : 'danger',
                        pos: 'top-center'
                        })  
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

     let form = (
        <Aux>

        <div className={classes.heading}>
            <legend className="uk-legend uk-margin-large-left uk-width-1-2 uk-text-center">Registration</legend>
        </div>
    
        <div className={classes.main}>
            
            <div className="uk-margin uk-margin-large-left uk-margin-small-top">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Name</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="text" placeholder="Enter your name" onChange={( event ) => {this.inputChangedHandler(event , "name" )} }/>
                </div>
            </div>
    
            <div className="uk-margin uk-margin-large-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Username <span uk-icon='icon: mail ; ratio: 1.40'></span></label>
                <div className="uk-form-controls uk-width-1-4" >
                    <input className={["uk-input",classes.credentials].join(" ")} uk-tooltip="title:Email;pos:top-right" type="text" placeholder="Enter your email" onChange={( event ) => {this.inputChangedHandler(event , "username" )} }/>
                </div>
            </div>
    
            <div className="uk-margin uk-margin-large-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Account Type</label>
                <div className="uk-form-controls uk-width-1-4">
                    <select className={["uk-input",classes.credentials].join(" ")} onChange={( event ) => {this.inputChangedHandler(event ,"account" )} }>
                        <option disabled value="selectoption">Select your option</option>
                        <option value="Customer">Customer</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
            </div>
    
            <div className="uk-margin uk-margin-large-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Password</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="password" placeholder="Enter the password" onChange={( event ) => {this.inputChangedHandler(event , "password")} }/>
                </div>
            </div>
    
            <div className="uk-child-width-1-3 uk-margin-large-left">
                <button className="uk-margin-small-top uk-button uk-button-primary uk-button-large" uk-tooltip="title:Register;pos:top-right" type="button" onClick={this.submitHandler}>Create Account</button>
            </div>
    
        </div>
        </Aux>
        
     ) 
     
     if(this.props.loading){
         form = <Spinner/>
     }

    return(
        form       
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        registerCheck : (name , username , password , account , callback) => dispatch(actions.authRegister(name , username , password , account , callback))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Register);