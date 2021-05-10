import React , { Component } from 'react';
import ProductCatalogue from '../../container/ProductCatalogue/ProductCatalogue';

class Admin extends Component{

    render(){
        let form = <ProductCatalogue/>
        return(
            <div>{form}</div>
        )
    }
}

export default Admin;