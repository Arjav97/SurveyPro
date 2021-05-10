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
        type: actionTypes.LOAD_STOP,
        loading:false
    }
}

export const addProduct = (name , desc , category , image , cc , link , callback) => {
    return dispatch => {
        dispatch(loadStart())
        
        const product = new FormData();
        product.append("name", name)
        product.append("desc",desc)
        product.append("category",category)
        product.append("cc",cc)
        product.append("link",link)
        product.append("image",image)
        
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

export const deleteProduct = (id) => {
    return dispatch => {
        dispatch(loadStart())
        const params ={
            id:id
        }
        axios.get('http://localhost:5000/api/product/deleteProduct', {params} , httpOptions)
        .then(response => {
            if(response.data.success === "true"){
                dispatch(updateSearchedProductAfterDeleting(id , false))
            }
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateSearchedProductAfterDeleting = (id , loading) => {
    return{
        type:actionTypes.PRODUCT_UPDATE_AFTER_DELETING,
        id:id,
        loading:loading
    }
}

export const editProduct = (id , name , desc , cc , link , callback) => {
    return dispatch => {
        dispatch(loadStart())

        const product = {
            id:id,
            name:name,
            desc:desc,
            cc:cc,
            link:link
        }
  
        axios.post('http://localhost:5000/api/product/editProduct',product, httpOptions)
        .then(response => {
            dispatch(loadFalse())
            callback(response.data)
        })
        .catch(err => {
            console.log(err)
        })

    }
}

export const getAllsearchedproduct = (products , loading) => {
    return{
        type: actionTypes.PRODUCT_UPDATE,
        products: products,
        loading: loading
    }
}

export const searchProduct = (name , category , callback ) => {
    return dispatch => {
        dispatch(loadStart())

        const params = {
            name: name,
            category: category
        }
        axios.get('http://localhost:5000/api/product/searchProduct',{params},httpOptions)
            .then(response => {
            dispatch(getAllsearchedproduct(response.data.doc , false))
            callback(response.data)
         })
        .catch(err => {
            console.log(err)
        })
    }
}

export const getProduct = (_id , callback) => {
    return dispatch => {
        dispatch(loadStart())

        const params = {
            _id : _id
        }

        axios.get('http://localhost:5000/api/product/getProduct',{params},httpOptions)
            .then(response => {
                console.log(response.data)
                callback(response.data)
                dispatch(setProduct(response.data.doc , false))
            })
            .catch(err => {
                console.log(err)
                
            })
    }
}

export const setProduct = (product , loading) => {
    return {
        type: actionTypes.SET_PRODUCT,
        product: product,
        loading: loading
    }
}

export const saveProduct = (name , productid) => {
    return dispatch => {
        const product = {
            name: name,
            productid: productid
        }
        
    axios.post('http://localhost:5000/api/product/saveProduct',product, httpOptions)
    .then(response => {
        console.log(response)
        dispatch(loadFalse())
    })
    .catch(err => {
        console.log(err)
        })
    }
}

export const unSaveProduct = (name , id) => {
    return dispatch => {

        const product = {
            name:name,
            id:id
        }

        axios.post('http://localhost:5000/api/product/unSaveProduct',product,httpOptions)
        .then(response => {
            dispatch(updateSavedProduct(id , false))
        })
        .catch(err => {
            console.log(err)
        })
    }
}

export const updateSavedProduct = (id , loading) => {
    return {
        type: actionTypes.UPDATE_SAVED_PRODUCT,
        id:id,
        loading:loading
    }
}

export const getsavedProduct = (name) => {
    return dispatch => {
        
        const params = {
            name: name
        }

        axios.get('http://localhost:5000/api/product/getsavedProduct',{params},httpOptions)
        .then(response => {
            console.log(response.data.doc[0].result)
            dispatch(setsavedProduct(response.data.doc[0].result))
            
        })
        .catch(err => {
            console.log(err)
        })
    }   
}

export const setsavedProduct = (savedproducts) => {
    return {
        type: actionTypes.SET_SAVED_PRODUCT,
        savedproducts: savedproducts
    }
}

export const saveReview = (id ,username, c1 , c2 , desc , rating, callback) => {
    return dispatch => {
        dispatch(loadStart());
        
        const product = {
            id:id,
            username:username,
            c1:c1,
            c2:c2,
            desc:desc,
            rating:rating
        }
        
        axios.post('http://localhost:5000/api/product/saveReview',product, httpOptions)
        .then(response => {
            callback(response.data)
            dispatch(loadFalse())
        })
        .catch(err => {
             console.log(err)
        })
    }
}

export const getReward = (callback) => {
    return dispatch => {
        dispatch(loadStart())
        
        axios.get('http://localhost:5000/api/product/getReward', httpOptions)
        .then(response => {
            callback(response.data)
            dispatch(loadFalse())
        })
        .catch(err => {
             console.log(err)
        })
    }
}
