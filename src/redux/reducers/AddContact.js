import {addContacts} from '../actions/actionTypes'

const initialState = {
    addContact: false
}

export default function DataBigReducer(state = initialState, action) {
    switch(action.type) {
        case addContacts:
            return {
                ...state,
                addContact: action.booleanAdd
            }
        default:
            return state
    }
}