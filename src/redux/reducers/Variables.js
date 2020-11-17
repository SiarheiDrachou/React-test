import {
    deleteUsers,
    small,
    big,
    list,
    newPage,
    user,
    userView,
    addContacts,
    addNewUser,
    searchUser,
    loader
} from '../actions/actionTypes'

const initialState = {
    dataBig: null,
    dataSmall: null,
    data: null,
    newPage: 1,
    list: null,
    paginations: [],
    size: null,
    startSize: null,
    endSize: null,
    userView: false,
    addContact: false,
    keys: [],
    isLoader: false,
    isPagination: false
}

export default function DataBigReducer(state = initialState, action) {
    switch(action.type) {
        case addContacts:
            return {
                ...state,
                addContact: action.booleanAdd
            }
        case addNewUser:
            return {
                ...state,
                data: action.arrData,
                list: action.arrList,
                paginations: action.arrPaginations,
                size: action.numberSize,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
                addContact: action.booleanAdd
            }
        case big:
            return {
                ...state,
                dataBig: action.arrDataBig,
                data: action.arrDataBig,
                newPage: action.numberNewPage,
                list: action.arrList,
                paginations: action.arrPaginations,
                size: action.numberSize,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
                userView: action.booleanUserView,
                isLoader: action.booleanLoader,
                keys: action.arrKeys,
                isPagination: action.booleanIsPagination
            }
        case small:
            return {
                ...state,
                dataSmall: action.arrDataSmall,
                data: action.arrDataSmall,
                newPage: action.numberNewPage,
                list: action.arrList,
                paginations: action.arrPaginations,
                size: action.numberSize,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
                userView: action.booleanUserView,
                isLoader: action.booleanLoader,
                keys: action.arrKeys,
                isPagination: action.booleanIsPagination
            }
        case deleteUsers:
            return {
                ...state,
                data: action.arrData,
                list: action.arrList,
                paginations: action.arrPaginations,
                size: action.numberSize,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
            }
        case list:
            return {
                ...state,
                list: action.arrList
            }
        case newPage:
            return {
                ...state,
                newPage: action.numberNewPage,
                list: action.arrList,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
                userView: action.booleanUserView
            }
        case searchUser:
            return {
                ...state,
                data: action.arrDataSmall,
                newPage: action.numberNewPage,
                list: action.arrList,
                paginations: action.arrPaginations,
                size: action.numberSize,
                startSize: action.numberStartSize,
                endSize: action.numberEndSize,
            }
        case user:
            return {
                ...state,
                user: action.arrUser,
                userView: action.booleanView
            }
        case userView:
            return {
                ...state,
                userView: action.booleanView
            }
        case loader:
            return {
                ...state,
                isLoader: action.booleanLoader
            }
        default:
            return state
    }
}