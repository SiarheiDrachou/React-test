import {data} from '../actions/actionTypes'

const initialState = {
    data: null
}

export default function DataBigReducer(state = initialState, action) {
    switch(action.type) {
        case data:
            return {
                ...state,
                data: action.arrData
            }
        default:
            return state
    }
}