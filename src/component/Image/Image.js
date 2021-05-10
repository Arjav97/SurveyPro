import React from 'react';
import { arrayBufferToBase64 } from '../../shared/utility';

const Image = (props) => {
    var base64Flag = 'data:image/jpg;base64,';
    var imageStr = arrayBufferToBase64(props.productImage);
    var image =  base64Flag + imageStr
    return (
        <img src={image} width={props.width} height={props.height} alt="helpful"/>
    )
}

export default Image;