import * as actionTypes from '../actions/actionTypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    username: null ,
    account : null ,
    loading: false ,
    error: null , 
    isAuthenticated: false
}

const authReducer = (state = initialState , action ) => {
    switch(action.type){
        case actionTypes.AUTH_START:
            return updateObject(state , { error:null , loading: true })

        case actionTypes.AUTH_LOADFALSE:
            return updateObject(state, {loading: action.loading})
        
        case actionTypes.AUTH_SUCCESS:
            return updateObject(state , {
                username: action.username ,
                account: action.account,
                loading: action.loading,
                isAuthenticated: true
            })

        case actionTypes.AUTH_FAIL:
            return updateObject(state , {
                error: action.error,
                loading: false
            })
        
        case actionTypes.AUTH_LOGOUT:
            return updateObject(state, {
                username: null,
                account: null,
                isAuthenticated: false ,
                loading: false
            })

        default:
            return state ;
    }
} 

export default authReducer;