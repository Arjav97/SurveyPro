import React , { Component } from 'react';
import { withRouter } from 'react-router';
import { Route , Switch } from 'react-router-dom';
import Login from '../src/container/Auth/Login/Login';
import Register from '../src/container/Auth/Register/Register';
import Admin from '../src/container/Admin/Admin';
import Customer from '../src/container/Customer/Customer';
import Layout from './component/Layout/Layout';
import Youtube from '../src/container/Customer/Youtube/Youtube';
import ProductAddition from '../src/container/Admin/ProductAddition/ProductAddition'; 

class App extends Component{
  render(){

    let routes = (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/youtube" component={Youtube}/>
        <Route path="/customer" component={Customer} />
        <Route path='/productaddition' component={ProductAddition}/>
        <Route path="/register" component={Register} />
        <Route path="/" exact component={Login} />
      </Switch>
    )
          
    return(
     <Layout>
       {routes}
      </Layout>
    )

  }
}

export default withRouter(App);
