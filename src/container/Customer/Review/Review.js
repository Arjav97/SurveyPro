import React , { Component } from 'react';
import classes from './Review.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxi';
import { updateObject , checkValidity } from '../../../shared/utility'
import * as UIkit from 'uikit';

class Review extends Component{
    state = {
        c1:false,
        c2:false,
        controls:{
            desc:{
                value:'',
                validation:{
                },
                valid:true
            },
            rating:{
                value:0,
                validation:{
                    range: true
                },
                valid:false
            }
        },
        formisValid:false
    }

    inputChangedHandler = (e , controlName) => {
        console.log(e.target.name + " " + e.target.checked)
        if(controlName === "c1")
            this.setState({c1 : e.target.checked})
        else if(controlName === "c2")
            this.setState({c2 : e.target.checked})
        else{
            let updatedValue = e.target.value
  
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
    }

    submitHandler = () => {
        if(this.state.formisValid){
            this.props.saveReview(localStorage.getItem("id"),this.props.username , this.state.c1 , this.state.c2 , this.state.controls.desc.value , this.state.controls.rating.value , (res)=> {
                if(res.success === 'true'){
                    UIkit.notification({
                    message: `<span uk-icon='icon: check'></span> ${res.message}`,
                    status : 'success',
                    pos: 'top-center'
                })
            }
            })
    
        }
        else{
            UIkit.notification({
                message: '<span uk-icon=\'icon: close\'></span> Out of range error',
                status : 'danger',
                pos: 'top-center'
            })
        }
    }


    render(){
        return(
            <Aux>
                <div className={classes.main}>
                    
                    <div className={classes.heading}>
                        <h2><u>Review Product</u></h2>
                    </div>
                        
                    <div style={{marginBottom: "50px"}}>
                        <span style={{float:'left',marginRight:'50px'}}><h3>Have you used this product before?</h3></span>
                        <input type="checkbox" className={classes.input} checked={this.state.c1} onChange={(event) => this.inputChangedHandler(event,"c1")}/>
                    </div>

                    <div style={{marginBottom: "50px"}}>
                        <span style={{float:'left',marginRight:'50px'}}><h3>Would you like to recommend this product to others?</h3></span>
                        <input type="checkbox" className={classes.input} checked={this.state.c2} onChange={(event) => this.inputChangedHandler(event,"c2")}/>
                    </div>

                    <div style={{marginBottom: "50px"}}>
                        <label className="uk-form-label uk-text-emphasis uk-text-large">Additional Comments:</label>
                        <div className="uk-form-controls uk-width-large uk-margin uk-margin-small-top" >
                            <textarea className={["uk-input",classes.credentials].join(" ")} placeholder="Enter your comments" onChange={(event) => this.inputChangedHandler(event, "desc")} />
                        </div>
                    </div>

                    <div style={{marginBottom: "50px"}}>
                        <span style={{float:'left',marginRight:'50px'}} className="uk-form-label uk-text-emphasis uk-text-large">Overall Ratings of the product:</span>
                        <input className={["uk-input",classes.credentials,classes.rating].join(" ")} type="text" placeholder="0" onChange={(event) => this.inputChangedHandler(event, "rating")} /> <span className={classes.rating}><b>/ 5</b></span>
                    </div>

                    <div style={{marginLeft:'140px'}}>
                       <button className="uk-button uk-button-large uk-button-primary" uk-tooltip="title:Submit;pos:top-right" type="button" onClick={this.submitHandler}>Submit Review</button>
                    </div>

                </div>
                
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return{
        username: state.auth.username
    }
}

const mapDispatchToProps = dispatch => {
    return{
        saveReview : (id ,username , c1 , c2 , desc , rating , callback) => dispatch(actions.saveReview(id , username , c1 , c2 , desc , rating , callback))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(Review);