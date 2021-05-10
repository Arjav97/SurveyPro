import React , { Component } from 'react';
import { connect } from 'react-redux';
import CustomerDrawer from '../SideDrawer/SideDrawers/CustomerDrawer';
import AdminDrawer from '../SideDrawer/SideDrawers/AdminDrawer';
import AuthDrawer from '../SideDrawer/SideDrawers/AuthDrawer';
import { withRouter } from 'react-router-dom';

class SideDrawers extends Component{
    render(){
        let form = null;
        if(this.props.isAuthenticated === true){
            if(this.props.account === "Customer"){
                form = <CustomerDrawer/>
            }
            else if(this.props.account === "Admin"){
                form = <AdminDrawer/>
            }
        }
        else if(this.props.isAuthenticated === false){
            form = <AuthDrawer/>
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