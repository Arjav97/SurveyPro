import React , { Component } from 'react';
import Aux from '../../hoc/Auxi';
import classes from './Layout.module.css';
import SideDrawers from '../UI/SideDrawer/SideDrawers';
import { withRouter } from 'react-router-dom';

class Layout extends Component {

    render(){
        console.log(this.props)
        return(
        <Aux>
           <div className={classes.top}>
               <SideDrawers/>             
            </div>
        
            <main className={classes.content}>
                {this.props.children}
            </main>
        </Aux>
        )
    }
}


export default withRouter(Layout);