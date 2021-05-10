import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState={
    loading: false,
    error: null,
    searchedproducts:[],
    product:[],
    savedproducts:[]
}

const productReducer = (state=initialState, action) => {
    switch(action.type){
        case actionTypes.LOAD_START:
            return updateObject(state , { error:null , loading: true })

        case actionTypes.LOAD_STOP:
            return updateObject(state, {loading: action.loading})
        
        case actionTypes.PRODUCT_UPDATE:
            return updateObject(state , {searchedproducts: action.products , loading: action.loading})
        
        case actionTypes.PRODUCT_UPDATE_AFTER_DELETING:
            return{
                ...state,
                searchedproducts: state.searchedproducts.filter(product => product._id !== action.id),
                loading: action.loading
            }

        case actionTypes.SET_PRODUCT:
            return updateObject(state , {product: action.product , loading: action.loading})

        case actionTypes.SET_SAVED_PRODUCT:
            return updateObject(state , {savedproducts: action.savedproducts})

        case actionTypes.UPDATE_SAVED_PRODUCT:
            return {
                ...state,
                savedproducts: state.savedproducts.filter(product => product._id !== action.id),
                loading: action.loading
            }
        
        case actionTypes.SET_AFTER_LOGOUT:
            return updateObject(state ,{product: [] , savedproducts: [] , searchedproducts: []} )

        default:
            return state;
    }
}

export default productReducer;