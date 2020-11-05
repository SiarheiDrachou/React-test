import {endSize} from '../actions/actionTypes'

const initialState = {
    endSize: null
}

export default function EndSizeReducer(state = initialState, action) {
    switch(action.type) {
        case endSize:
            return {
                ...state,
                endSize: action.numberEndSize
            }
        default:
            return state
    }
}