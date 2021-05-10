import React , { Component } from 'react';
import classes from './Reward.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Auxi';
import { updateObject , checkValidity } from '../../../shared/utility'
import * as UIkit from 'uikit';
import ProductList from '../../../component/Product/ProductList/ProductList';

class Reward extends Component{
    state = {
        products: []
    }

    componentDidMount(){
        this.props.getReward((res) => {
            this.setState({products:res.doc})
            console.log(this.state.products)
        })
    }
    render(){
        return(
            <Aux>
                <div className={classes.main}><ProductList products={this.state.products} type="reward"/></div>
                
            </Aux>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return{
        getReward : (callback) => dispatch(actions.getReward(callback))
    }
}
export default connect(null , mapDispatchToProps)(Reward)