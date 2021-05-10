import React , {Component} from 'react';
import classes from './SavedProductListItem.module.css';
import Aux from '../../../hoc/Auxi';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class ProductListItem extends Component{

    render(){
        
        return(
        <Aux>
        <div onClick={() => {this.props.onproductSelect(this.props.product)}}>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover uk-card-body uk-margin uk-margin-medium-bottom">
                <div className="uk-card-header">
                        <div>
                            <span className={classes.cardHeader}>{this.props.product.name}</span>
                           <button className={["uk-button uk-margin-left-large uk-button-secondary uk-button-small",classes.Button].join(" ")} onClick = { () => this.props.unSave(this.props.product) }><span uk-icon="close"></span>Unsave</button>
                        </div>
                </div>
                <div className="uk-card-body">
                        <p className="uk-align-center"><Link to={`products/${this.props.product._id}` }> <img src={`data:image/jpg;base64,${this.props.product.image.data}`} width="150" height="150" alt="helpful"/> </Link> </p>
                </div>
            </div>
        </div>
        </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        account: state.auth.account
    }
}

export default connect(mapStateToProps,null)(ProductListItem);