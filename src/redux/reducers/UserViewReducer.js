import {userView} from '../actions/actionTypes'

const initialState = {
    userView: false
}

export default function UserViewReducer(state = initialState, action) {
    switch(action.type) {
        case userView:
            return {
                ...state,
                userView: action.booleanView
            }
        default:
            return state
    }
}