import {combineReducers} from 'redux'

import dataBig from './DataBigReducer'
import data from './DataReducer'
import dataSmall from './DataSmallReducer'
import endSize from './EndSizeReducer'
import size from './SizeReducer'
import startSize from './StartSizeReducer'
import list from './ListReducer'
import newPage from './NewPageReducer'
import paginations from './PaginationsReducer'
import user from './UserReducer'
import userView from './UserViewReducer'
import addContact from './AddContact'
import keys from './Keys'

export default combineReducers({
    data,
    dataBig,
    dataSmall,
    size,
    startSize,
    endSize,
    list,
    newPage,
    paginations,
    user,
    userView,
    addContact,
    keys
})