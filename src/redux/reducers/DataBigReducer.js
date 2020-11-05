import {big} from '../actions/actionTypes'

const initialState = {
    dataBig: null
}

export default function DataBigReducer(state = initialState, action) {
    switch(action.type) {
        case big:
            return {
                ...state,
                dataBig: action.arrDataBig
            }
        default:
            return state
    }
}