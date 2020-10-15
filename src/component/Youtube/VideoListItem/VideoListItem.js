import React from 'react';
import classes from './VideoListItem.module.css';

const VideoListItem = (props) => {
    
    const imageUrl = props.video.snippet.thumbnails.default.url;

        return (
        <div className={classes.Card} onClick={() => props.onVideoSelect(props.video)}>
            <div className="uk-card uk-card-default uk-card-small uk-card-hover uk-card-body">
                <div className="uk-grid">
                        <div className="uk-width-1-3"><img alt="video" src={imageUrl} /></div>
                        <div className="uk-width-1-2">{props.video.snippet.title}</div>
                </div>
            </div>
        </div>
        )
    
}

export default VideoListItem;