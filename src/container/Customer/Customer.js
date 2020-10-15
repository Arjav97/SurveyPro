import React , { Component } from 'react';
import Aux from '../../hoc/Auxi';
import { Link } from 'react-router-dom';

class Customer extends Component{

    render(){
        console.log(this.props)
        return(
            <Aux>
                <div>In Customer component</div>
            </Aux>
        )
    }
}

export default Customer;