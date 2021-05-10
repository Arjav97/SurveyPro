import React from 'react';
import Aux from '../../../../hoc/Auxi';
import { withRouter } from 'react-router-dom';
import classes from './Drawer.module.css';

const AuthDrawer = () => (    

    <Aux>
        <nav className="uk-navbar-container" uk-navbar="true">
            
        <div className="uk-navbar-left">
            <ul className="uk-navbar-nav">

            <li className={classes.logoauth}> <img style={{marginTop:"3px",marginBottom:"3px"}} src="/images/icon_survey.png" width="60px" height="30px" alt="SurveyPro" /></li>
            <li style={{fontStyle:"Times New Roman",fontSize:"25px",marginTop:"20px",marginLeft:"15px"}}><b>SurveyPro</b></li>
            </ul>
        </div>

        </nav>
        
    </Aux>
)

export default withRouter(AuthDrawer);