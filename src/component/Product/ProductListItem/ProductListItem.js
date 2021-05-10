import React , {Component} from 'react';
import classes from './ProductListItem.module.css';
import Aux from '../../../hoc/Auxi';
import { connect } from 'react-redux';
import Image from '../../Image/Image';
import { Link } from 'react-router-dom';

class ProductListItem extends Component{

    render(){
        
        return(
        <Aux>
        <div onClick={() => {this.props.onproductSelect(this.props.product)}}>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover uk-card-body">
                <div className="uk-card-header">
                        <div>
                            <span className={classes.cardHeader}>{this.props.product.name}</span>
                            {this.props.account==="Customer"?(<button className={["uk-button uk-margin-left-large uk-button-secondary uk-button-small",classes.Button].join(" ")} onClick = { () => this.props.onSave(this.props.product) }><span uk-icon="plus"></span>Save</button>):(<button className={["uk-button uk-margin-left-large uk-button-secondary uk-button-small",classes.Button].join(" ")} onClick = { () => this.props.onRemove(this.props.product)}>Remove <span uk-icon="trash"></span></button>)}
                        </div>
                </div>
                <div className="uk-card-body">
                        <p className="uk-align-center"><Link to={`products/${this.props.product._id}` }> <Image productImage={this.props.product.image.data.data} width="150" height="150"/> </Link> </p>
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