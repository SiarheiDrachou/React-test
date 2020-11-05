import {startSize} from '../actions/actionTypes'

const initialState = {
    startSize: null
}

export default function StartSizeReducer(state = initialState, action) {
    switch(action.type) {
        case startSize:
            return {
                ...state,
                startSize: action.numberStartSize
            }
        default:
            return state
    }
}