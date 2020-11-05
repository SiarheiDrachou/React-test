import {size} from '../actions/actionTypes'

const initialState = {
    size: null
}

export default function SizeReducer(state = initialState, action) {
    switch(action.type) {
        case size:
            return {
                ...state,
                size: action.numberSize
            }
        default:
            return state
    }
}