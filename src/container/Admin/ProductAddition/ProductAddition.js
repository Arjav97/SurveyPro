import React , { Component } from 'react';
import classes from './ProductAddition.module.css';
import { updateObject , checkValidity } from '../../../shared/utility'
import * as UIkit from 'uikit';
import { connect } from 'react-redux';
import Aux from '../../../hoc/Auxi';
import * as actions from '../../../store/actions/index';

class ProductAddition extends Component{

    state = {
        controls:{
            name: {
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            desc:{
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            cc:{
                value: '',
                validation: {
                    required: true
                },
                valid: false                
            },
            link:{
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            image:{
                value:'',
                validation:{
                    
                },
                valid:true
           }
                
            }
        ,
        formisValid: false
    }

    inputChangedHandler = (event , controlName) => {
        let updatedValue = null
        if(controlName === "image")
            updatedValue = event.target.files[0]
        else
            updatedValue = event.target.value
  
            const updatedControls = updateObject(this.state.controls , {
                [controlName] : updateObject(this.state.controls[controlName] , {
                    value: updatedValue,
                    valid: checkValidity(updatedValue , this.state.controls[controlName].validation)
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
            this.props.addProduct(this.state.controls.name.value , this.state.controls.desc.value , this.state.controls.image.value , this.state.controls.cc.value , this.state.controls.link.value , (res)=> {

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

        return (
        <Aux>
        <div className={classes.main}>
            <div id="heading">
                <legend className="uk-legend uk-margin-medium-left uk-margin-medium-bottom uk-text-center uk-width-1-4">Product Addition</legend>
            </div>
    
            <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Product Name</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} uk-tooltip="title:Name;pos:top-right" type="text" placeholder="Enter Name" onChange={(event) => this.inputChangedHandler(event , "name")} />
                </div>
            </div>

            <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Description</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="textarea" placeholder="Enter the description of product" onChange={(event) => this.inputChangedHandler(event, "desc")} />
                </div>
            </div>

            <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Image</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input" , classes.image ].join(" ")} type="file" placeholder="Choose image" onChange={(event) => this.inputChangedHandler(event, "image")} />
                </div>
            </div>

            <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Coupon code</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="text" placeholder="Enter the coupon code" onChange={(event) => this.inputChangedHandler(event, "cc")} />
                </div>
            </div>

            <div className="uk-margin uk-margin-small-left">
                <label className="uk-form-label uk-text-emphasis uk-text-large">Link</label>
                <div className="uk-form-controls uk-width-medium" >
                    <input className={["uk-input",classes.credentials].join(" ")} type="text" placeholder="Enter the link of product" onChange={(event) => this.inputChangedHandler(event, "link")} />
                </div>
            </div>

            <div className="uk-child-width-1-3 uk-margin-small-left uk-margin-medium-top">
                <button className="uk-button uk-button-large uk-button-primary" uk-tooltip="title:Add;pos:top-right" type="button" onClick={this.submitHandler}>Add Product</button>
            </div>
                   
        </div>
        </Aux>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addProduct: (name , desc , image , cc , link , callback) => dispatch(actions.addProduct(name , desc , image , cc , link , callback))
    }
}

export default connect(null , mapDispatchToProps )(ProductAddition);
