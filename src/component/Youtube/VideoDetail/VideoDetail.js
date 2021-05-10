import React from 'react';
import classes from './VideoDetail.module.css';

const VideoDetail = (props) => {

    if(!props.video){
        return <div className={classes.Desc}><h3>None of the videos searched.</h3></div>
    }
    const videoId = props.video.id.videoId;
    const url = `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="uk-grid uk-child-width-1-1">
            <div><iframe title={props.video.etag} height="400" width="850" allowFullScreen={true} src={url} /></div>
            <div className="uk-margin-medium-top"><h3>{props.video.snippet.title}</h3></div>
            <div className="uk-margin-small-top"><h7>{props.video.snippet.description}</h7></div>
        </div>        
    )
}

export default VideoDetail;