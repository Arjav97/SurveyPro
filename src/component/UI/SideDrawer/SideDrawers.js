import React , { Component } from 'react';
import { connect } from 'react-redux';
import CustomerDrawer from '../SideDrawer/SideDrawers/CustomerDrawer';
import AdminDrawer from '../SideDrawer/SideDrawers/AdminDrawer';
import { withRouter } from 'react-router-dom';

class SideDrawers extends Component{
    render(){
        console.log(this.props)
        let form = null;
        if(this.props.isAuthenticated){
            if(this.props.account === "Customer")
                form = <CustomerDrawer/>
            else 
                form = <AdminDrawer/>
        }
        
        return (
            form
        )
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        account : state.auth.account
    }
}

export default withRouter(connect(mapStateToProps , null)(SideDrawers));