import React , { Component } from 'react';
import YTSearch from 'youtube-api-search';
import Aux from '../../../hoc/Auxi';
import { updateObject , checkValidity } from '../../../shared/utility';
import classes from './Youtube.module.css';
import * as UIkit from 'uikit';
import VideoList from '../../../component/Youtube/VideoList/VideoList';
import VideoDetail from '../../../component/Youtube/VideoDetail/VideoDetail';
import { withRouter } from 'react-router-dom';

const API_KEY = 'AIzaSyA3Q2AewDwrKCZnRFjmcUi4WfikbJQAEHY';

class Youtube extends Component{
    
    state = {
        videos : [],
        selectedVideo: null,
        search: {
            value: '',
            validation: {
                required: true
            },
            valid: false
        }
    }

    inputChangedHandler = (event) => {
        const updatedSearch = updateObject(this.state.search , {
            value: event.target.value,
            valid: checkValidity( event.target.value , this.state.search.validation)
        })
        this.setState({search: updatedSearch})
    }

    submitHandler = () => {
        if(this.state.search.valid){
               YTSearch({key : API_KEY , term : this.state.search.value } , (data) => {
                   console.log(data)
                   this.setState({videos:data , selectedVideo:data[0]})
               })
            
        }
        else{
            UIkit.notification({
                message: '<span uk-icon=\'icon: close\'></span> Required Field',
                status : 'danger',
                pos: 'top-center'
            })
        }
    }

    onVideoSelect = (video) => {
        this.setState({selectedVideo:video})
    }

    render(){
        console.log(this.props)
        return(
            <Aux>
                <div className={classes.Searchbox}>
                    <div className="uk-form-controls uk-child-width-1-2" >
                        <input className={["uk-input",classes.credentials].join(" ")}  type="text" placeholder="Search video" onChange={(event) => this.inputChangedHandler(event)} />
                        <button className={["uk-button uk-button-danger uk-width-small" , classes.Button].join(" ")} uk-tooltip="Search video" onClick={this.submitHandler}><span className="uk-margin-small-top uk-margin-medium-right" uk-icon="search"></span></button>
                    </div>
                </div>
                <div className="uk-grid">
                    <div className="uk-width-2-3">
                           <div className={classes.VideoDetail}> <VideoDetail video={this.state.selectedVideo}/> </div>
                    </div>
                    <div className="uk-width-1-3">
                             <div className={classes.VideoList}><VideoList onVideoSelect={this.onVideoSelect} videos={this.state.videos}/></div>
                    </div>
                                      
                </div>
            </Aux>
        )
    }
}

export default withRouter(Youtube);