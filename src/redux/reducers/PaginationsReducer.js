import {paginations} from '../actions/actionTypes'

const initialState = {
    paginations: []
}

export default function PaginationsReducer(state = initialState, action) {
    switch(action.type) {
        case paginations:
            return {
                ...state,
                paginations: action.arrPaginations
            }
        default:
            return state
    }
}