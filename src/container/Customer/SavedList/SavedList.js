import React , { Component } from 'react';
import classes from './SavedList.module.css';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import ProductList from '../../../component/Product/ProductList/ProductList';
import Aux from '../../../hoc/Auxi';
import * as UIkit from 'uikit';

class SavedList extends Component{

    componentDidMount(){
        this.props.getsavedProduct(this.props.name)
    }

    onproductSelect = (product) => {
        localStorage.setItem('id', product._id)
    }

    unSave = (product) => {
        UIkit.notification({
            message: `<span uk-icon='icon: check'></span> Item unsaved successfully`,
            status : 'success',
            pos: 'top-center'
            })
        this.props.unSaveProduct(this.props.name , product._id)
    }

    render(){
        return(
            <Aux>
            <div className={classes.main}>
                <div className={classes.legend}>
                    <h3><u>Saved Products</u></h3>
                </div>
                <div className={classes.productlist}>
                    <div className={["uk-grid-row-medium uk-grid-column-medium uk-margin-medium-bottom uk-grid uk-child-width-1-4"].join(" ")}>
                        <ProductList products={this.props.savedproducts} type="save" onproductSelect={(product)=> {this.onproductSelect(product)}} unSave={(product) => {this.unSave(product)}}/>
                    </div>
                </div>
            </div>
            </Aux>
        )
    }
}

const mapStateToProps = state => {
    return {
        name: state.auth.username,
        savedproducts: state.products.savedproducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getsavedProduct : (name) => dispatch(actions.getsavedProduct(name)),
        unSaveProduct: (name , id) => dispatch(actions.unSaveProduct(name , id))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(SavedList);