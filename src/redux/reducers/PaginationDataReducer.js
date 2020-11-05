import {paginationData} from '../actions/actionTypes'

const initialState = {
    paginationData: []
}

export default function PaginationDataReducer(state = initialState, action) {
    switch(action.type) {
        case paginationData:
            return {
                ...state,
                paginationData: action.arrPaginationData
            }
        default:
            return state
    }
}