import React , {Component} from 'react';
import classes from './RewardList.module.css';
import Aux from '../../hoc/Auxi';

class RewardList extends Component{

    render(){
        
        return(
        <Aux>
        <div>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover uk-card-body uk-margin-large-left uk-margin-large-right uk-margin-medium-bottom">
                <div className="uk-card-header">
                        <div>
                            <span className={classes.cardHeader}>{this.props.product.name}</span>
                        </div>
                </div>
                <div className="uk-card-body">
                     <p className="uk-align-center"> 
                     <div> coupon code: {this.props.product.cc}</div><div>link: {this.props.product.link}</div></p>
                </div>
            </div>
        </div>
        </Aux>
        )
    }
}


export default (RewardList);