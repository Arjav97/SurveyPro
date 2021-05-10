import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxi';
import Logout from '../../../../container/Auth/Logout/Logout';
import { withRouter } from 'react-router-dom';
import classes from './Drawer.module.css';

const AdminDrawer = () => (
   
   <Aux>
       <nav className="uk-navbar-container" uk-navbar="true">
            
            <div className="uk-navbar-left">
                <ul className="uk-navbar-nav">
                <li>    
                <button className="uk-button uk-button-default uk-margin-small-left uk-margin-small-top" type="button" uk-toggle="target: #offcanvas-usage-admin"><div uk-tooltip="Click"><span uk-icon="icon: table; ratio: 1"></span></div></button>
        
                <div id="offcanvas-usage-admin" uk-offcanvas="mode:push">
                <div className="uk-offcanvas-bar">
                <button className="uk-offcanvas-close" type="button" uk-close="false"></button>
                <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
                    <li className="uk-nav-header">Views</li>
                    <li className="uk-nav-divider"></li>
                    <li> <Link to="/admin">Admin</Link> </li>
                    <li>  <Link to="/productaddition">Add Product</Link> </li> 
                    <li> <Link to="/productcatalogue">Product Catalogue</Link> </li>
                    
                </ul>
                </div>
            </div>
            </li>
    
                <li className={classes.logo}> <img style={{marginTop:"3px",marginBottom:"3px"}} src="/images/icon_survey.png" width="60px" height="30px" alt="SurveyPro" />  </li>
                <li style={{fontStyle:"Times New Roman",fontSize:"25px",marginTop:"20px",marginLeft:"15px"}}><b>SurveyPro</b></li>
                <li className={classes.logout}><Logout/></li>
                </ul>
            </div>
    
            </nav>

    </Aux>
)

export default withRouter(AdminDrawer);