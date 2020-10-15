import React from 'react';
import { Link } from 'react-router-dom';
import Aux from '../../../../hoc/Auxi';
import Logout from '../../../../container/Auth/Logout/Logout';
import { withRouter } from 'react-router-dom';

const CustomerDrawer = (props) => (
    

    <Aux>
     
    <button className="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-usage"><div uk-tooltip="Click"><span uk-icon="icon: table; ratio: 1"></span></div></button>
        
    <div id="offcanvas-usage" uk-offcanvas="overlay:true">
        <div className="uk-offcanvas-bar">

            <button className="uk-offcanvas-close" type="button" uk-close="false"></button>

            <ul className="uk-nav uk-nav-primary uk-nav-center uk-margin-auto-vertical">
                <li className="uk-nav-header">Views</li>
                <li className="uk-nav-divider"></li>
                <li> <Link to="/customer"><h3>Customer</h3></Link> </li>
                <li> <Link to="/youtube"><h3>Search in youtube</h3></Link> </li> 
            </ul>

        </div>
    </div>

    <Logout/>

    </Aux>
    
)

export default withRouter(CustomerDrawer);