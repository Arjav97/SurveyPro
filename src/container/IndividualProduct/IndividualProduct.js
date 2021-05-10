import React , { Component } from 'react';
import classes from './IndividualProduct.module.css';
import Image from '../../component/Image/Image';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi';
import * as actions from '../../store/actions/index';
import * as UIkit from 'uikit';

class IndividualProduct extends Component{
    state={
        product:[]
    }

    componentWillMount(){
        setTimeout((this.props.getProduct(localStorage.getItem("id") , (res)=>{
            this.setState({product:res.doc})
        })
        ),1000)
    }

    editDetail(){
        this.props.history.push('/editproduct')
    }

    giveReview(){
        this.props.history.push('/review')
    }

    assignReward(){
        UIkit.notification({
            message: `<span uk-icon='icon: check'></span> Rewards assigned successfully`,
            status : 'success',
            pos: 'top-center'
            })
    }
    
    render(){
 
        return(
            <div>
                {this.state.product.length> 0? (  <Aux>
                <div className={classes.main}>
                    <div className={classes.heading}>
                        <span style={{float:"left"}}>
                            <u><h3>{this.state.product[0].name}</h3></u> 
                        </span>
                        {this.props.account==="Customer"?(<button className={["uk-button uk-button-secondary uk-width-medium" , classes.Button].join(" ")} uk-tooltip="Give Review" onClick={() => this.giveReview()}><span className="uk-margin uk-margin-small-right" uk-icon="comments"></span>Give Review</button>):( 
                        
                        <span><button className={["uk-button uk-button-secondary uk-width-medium" , classes.Button].join(" ")} uk-tooltip="Edit" onClick={() => this.editDetail()}><span className="uk-margin uk-margin-small-right" uk-icon="pencil"></span>Edit Details</button>
                        <button className={["uk-button uk-button-secondary uk-width-medium uk-margin uk-margin-bottom" , classes.Button].join(" ")} uk-tooltip="Assign Rewards" onClick={() => this.assignReward()}><span className="uk-margin uk-margin-small-right" uk-icon="check"></span>Assign Rewards</button>
                        </span>)}
                        
                    </div>
                    <div style={{marginBottom: "50px"}}>
                        <span><h3>Description : <span style = {{ marginLeft:"60px"}}>{this.state.product[0].desc}</span></h3></span>
                    </div>
                    <div style={{marginBottom: "50px"}}>
                        <span><h3>Category : <span style = {{ marginLeft:"80px"}} >{this.state.product[0].category}</span></h3></span> 
                    </div>
                    {this.props.account==="Admin"?(
                        <Aux>
                         <div style={{marginBottom: "50px"}}>
                         <span><h3>Coupon code : <span style = {{ marginLeft:"32px"}}>{this.state.product[0].cc}</span></h3></span>
                     </div>
                     <div style={{marginBottom: "50px"}}>
                         <span><h3>Link : <span style = {{ marginLeft:"130px"}}>{this.state.product[0].link}</span></h3></span>
                     </div>
                     </Aux>
                    ):null}
                   
                    <div style={{marginBottom: "50px"}}>
                        <span><h3>Image : <span style = {{ marginLeft:"130px"}} ><Image productImage={this.state.product[0].image.data.data} width="300" height="300"/></span></h3></span>
                    </div>
                </div>
            </Aux>):null}
            </div>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        product: state.products.product,
        loading: state.products.loading,
        account: state.auth.account
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getProduct : (_id , callback) => dispatch(actions.getProduct(_id , callback))
    }
}

export default connect( mapStateToProps , mapDispatchToProps )(IndividualProduct);
