import {list} from '../actions/actionTypes'

const initialState = {
    list: null
}

export default function ListReducer(state = initialState, action) {
    switch(action.type) {
        case list:
            return {
                ...state,
                list: action.arrList
            }
        default:
            return state
    }
}