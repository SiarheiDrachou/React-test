import {key} from '../actions/actionTypes'

const initialState = {
    keys: []
}

export default function EndSizeReducer(state = initialState, action) {
    switch(action.type) {
        case key:
            return {
                ...state,
                keys: action.arrKeys
            }
        default:
            return state
    }
}