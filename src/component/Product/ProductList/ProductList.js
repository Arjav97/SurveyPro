import React from 'react';
import ProductListItem from '../ProductListItem/ProductListItem';
import classes from './ProductList.module.css';
import SavedProductListItem from '../SavedProductListItem/SavedProductListItem';
import RewardList from '../../RewardList/RewardList';

const ProductList = (props) => {

    if(props.products.length === 0 ){
        return <div className={classes.Desc}><h3>{props.type ==="save"?("None of the products saved yet"):("None of the products searched yet.")}</h3></div>
    }

    let productList = null;
    if(props.type === "save"){
        productList = props.products.map((product)=> {
            return ( <SavedProductListItem onproductSelect={props.onproductSelect} key={product._id} product={product} unSave={props.unSave}/> )
        })
    }
    else if(props.type === "reward"){
        productList = props.products.map((product)=>{
            return (<RewardList key={product._id} product={product}/>)
        }) 
    }
    else{
        productList = props.products.map((product)=> {
            return (<ProductListItem onproductSelect={props.onproductSelect} onSave={props.onSave} onRemove={props.onRemove} key={product._id} product={product}/> )
        })
    }
    

    return (
        productList
    )
}

export default ProductList;