import {newPage} from '../actions/actionTypes'

const initialState = {
    newPage: 1
}

export default function NewPageReducer(state = initialState, action) {
    switch(action.type) {
        case newPage:
            return {
                ...state,
                newPage: action.numberNewPage
            }
        default:
            return state
    }
}