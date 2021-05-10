import React , { Component } from 'react';
import classes from './ProductCatalogue.module.css';
import { updateObject , checkValidity } from '../../shared/utility';
import * as UIkit from 'uikit';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxi';
import ProductList from '../../component/Product/ProductList/ProductList';
import * as actions from '../../store/actions/index';

class ProductCatalogue extends Component{
    state = {
        controls:{
            name: {
                value: '',
                validation: {
                    required: true
                },
                valid: false
            },
            category:{
                value:'selectcategory',
                validation:true,
                valid:true
            }
        },
        formisValid: false
    }

    onproductSelect = (product) => {
        localStorage.setItem('id', product._id)
    }

    onSave = (product) => {
        UIkit.notification({
            message: `<span uk-icon='icon: check'></span> Item saved successfully`,
            status : 'success',
            pos: 'top-center'
            })
        this.props.saveProduct(this.props.name , product._id )
        console.log(product)
    }

    onRemove = (product) => {
        UIkit.notification({
            message: `<span uk-icon='icon: check'></span> Item removed successfully`,
            status : 'success',
            pos: 'top-center'
            })
        this.props.deleteProduct(product._id)
        
    }

    inputChangedHandler = (event , controlName) => {
        let updatedValue = event.target.value
       
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

    submitHandler = (name) => {
        if(name==="searchbyname"){
            if(this.state.controls.name.valid === true){
                this.props.searchProduct(this.state.controls.name.value, "", (res)=> {
                    if(res.success === "true"){
                        UIkit.notification({
                            message: `<span uk-icon='icon: check'></span> ${res.message}`,
                            status : 'success',
                            pos: 'top-center'
                            })        
                    }
                    else if(res.success === "false"){
                        UIkit.notification({
                            message: `<span uk-icon='icon: check'></span> ${res.message}`,
                            status : 'danger',
                            pos: 'top-center'
                            })
                        }
                })
            }
        }
        else if(name==="searchbycategory"){
            if(this.state.controls.category !== "selectcategory"){
                this.props.searchProduct("",this.state.controls.category.value,(res) => {
                    if(res.success === "true"){
                        UIkit.notification({
                            message: `<span uk-icon='icon: check'></span> ${res.message}`,
                            status : 'success',
                            pos: 'top-center'
                            })
                    }
                    else if(res.success === "false"){
                        UIkit.notification({
                            message: `<span uk-icon='icon: check'></span> ${res.message}`,
                            status : 'danger',
                            pos: 'top-center'
                            })
                    }
                })
            }
        }
    
    }

    render(){
        return(
            <Aux>
            <div className={classes.main}>
                
                    <div className={classes.controls}>
                        
                        <input className={["uk-form-controls","uk-width-medium","uk-input",classes.credentials].join(" ")} uk-tooltip="title:Searchbyname;pos:top-right" name="searchbyname" type="text" placeholder="Search by name" onChange={(event) => this.inputChangedHandler(event , "name")} />
                        <button className={["uk-button uk-button-danger uk-width-small" , classes.Button].join(" ")} uk-tooltip="Click to Search by Name" onClick={() => this.submitHandler("searchbyname")}><span className="uk-margin-small-top uk-margin-medium-right" uk-icon="search"></span></button>
                        <select className={["uk-margin","uk-margin-large-left","uk-form-controls","uk-width-medium","uk-input",classes.credentials].join(" ")} uk-tooltip="title:Searchbycategory;pos:top-right" onChange={( event ) => {this.inputChangedHandler(event ,"category" )}} >
                            <option value="selectoption">Select category</option>
                            <option value="Accessories">Accessories</option>
                            <option value="Electronic">Electronic</option>
                            <option value="Apparel">Apparel</option>
                            <option value="Sports">Sports</option>
                        </select>
                        <button className={["uk-button uk-button-danger uk-width-small" , classes.Button].join(" ")} uk-tooltip="Click to Search to Category" onClick={() => this.submitHandler("searchbycategory")}><span className="uk-margin-small-top uk-margin-medium-right" uk-icon="search"></span></button>
                    </div>

                    <div className={classes.productlist}>
                        <div className={["uk-grid-row-medium uk-grid-column-medium uk-grid uk-child-width-1-4",classes.noborder].join(" ")}>
                            <ProductList products={this.props.products} onproductSelect={(product) => {this.onproductSelect(product)}} onSave={(product)=> {this.onSave(product)}} onRemove={(product) => {this.onRemove(product)}} />
                        </div>
                    </div>  
                  
                </div>
                
            </Aux>
            )
    }
}

const mapStateToProps = state => {
    return {
        name : state.auth.username,
        products: state.products.searchedproducts
    }
}

const mapDispatchToProps = dispatch => {
    return {
        searchProduct : (name , category , callback) => dispatch(actions.searchProduct(name , category , callback)),
        saveProduct : (name , productid) => dispatch(actions.saveProduct(name , productid)),
        deleteProduct : (id) => dispatch(actions.deleteProduct(id))
    }
}

export default connect(mapStateToProps , mapDispatchToProps)(ProductCatalogue);