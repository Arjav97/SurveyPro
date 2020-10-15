import * as actionTypes from './actionTypes';
import axios from 'axios';

const httpOptions = {
    headers: { 'enctype': 'multipart/form-data' }
  };

export const loadStart = () => {
    return {
        type: actionTypes.LOAD_START
    }
}

export const loadFalse = () => {
    return {
        type: actionTypes.LOAD_FALSE,
        loading:false
    }
}

export const addProduct = (name , desc , image , cc , link , callback) => {
    return dispatch => {
        console.log(name + " "+ desc +" "+image+" "+cc+" "+link)
        dispatch(loadStart())
        
        const product = new FormData();
        product.append("name", name)
        product.append("desc",desc)
        product.append("cc",cc)
        product.append("link",link)
        product.append("image",image)
        /*const productData = {
            name: name,
            desc : desc,
            cc : cc,
            image:image,
            link : link
        }*/
        axios.post('http://localhost:5000/api/product/addProduct',product, httpOptions)
        .then(response => {
            dispatch(loadFalse())
            callback(response.data)
        })
        .catch(err => {
            console.log(err)
        })
    }
}
