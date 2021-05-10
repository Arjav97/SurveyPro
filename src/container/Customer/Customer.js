import React , { Component } from 'react';
import Aux from '../../hoc/Auxi';
import ProductCatalogue from '../ProductCatalogue/ProductCatalogue';

class Customer extends Component{

    render(){
        let form= <ProductCatalogue/>
        console.log(this.props)
        return(
            <Aux>
                <div>{form}</div>     
            </Aux>
        )
    }
}

export default Customer;