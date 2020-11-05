import {user} from '../actions/actionTypes'

const initialState = {
    user: null
}

export default function UserReducer(state = initialState, action) {
    switch(action.type) {
        case user:
            return {
                ...state,
                user: action.arrUser
            }
        default:
            return state
    }
}