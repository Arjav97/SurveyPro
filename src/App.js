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
import ProductCatalogue from '../src/container/ProductCatalogue/ProductCatalogue';
import IndividualProduct from '../src/container/IndividualProduct/IndividualProduct';
import SavedList from '../src/container/Customer/SavedList/SavedList';
import EditProduct from '../src/container/Admin/EditProduct/EditProduct';
import Review from '../src/container/Customer/Review/Review';
import Reward from '../src/container/Admin/Reward/Reward';

class App extends Component{
  render(){

    let routes = (
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/youtube" component={Youtube}/>
        <Route path="/customer" component={Customer} />
        <Route path='/productaddition' component={ProductAddition}/>
        <Route path='/productcatalogue' component={ProductCatalogue}/>
        <Route path="/register" component={Register} />
        <Route path="/products/:id" component={IndividualProduct} />
        <Route path="/savelist" component={SavedList} />
        <Route path="/editproduct" component={EditProduct}/>
        <Route path='/review' component={Review}/>
        <Route path='/reward' component={Reward}/>
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
