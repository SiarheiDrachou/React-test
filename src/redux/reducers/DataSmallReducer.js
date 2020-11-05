import {small} from '../actions/actionTypes'

const initialState = {
    dataSmall: null
}

export default function DataSmallReducer(state = initialState, action) {
    switch(action.type) {
        case small:
            return {
                ...state,
                dataSmall: action.arrDataSmall
            }
        default:
            return state
    }
}