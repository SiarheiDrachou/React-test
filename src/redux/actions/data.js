import axios from 'axios';
import {
small,
big,
data,
list,
paginations,
paginationData,
newPage,
size,
startSize,
endSize,
user,
userView,
} from './actionTypes'

export function requestSmall() {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.dataSmall.dataSmall === null) {
            await axios.get(`http://www.filltext.com/?rows=33&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|5}`)
                .then(res => {
                    dispatch(requestSmallSuccess(res.data));
                    dispatch(requestDataSuccess(res.data));
                    dispatch(changeNewPage(1));
                    dispatch(changeList(page(res.data, state)));
                    dispatch(changePaginations(pagination(res.data)));
                    dispatch(changeSize(changesSize(res.data)));
                    dispatch(changeStartSize(changesStartSize(state)));
                    dispatch(changeEndSize(changesEndSize(res.data, state)));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestDataSuccess(state.dataSmall.dataSmall));
            dispatch(changeNewPage(1));
            dispatch(changeList(page(state.dataSmall.dataSmall, state)));
            dispatch(changePaginations(pagination(state.dataSmall.dataSmall)));
            dispatch(changeSize(changesSize(state.dataSmall.dataSmall)));
            dispatch(changeStartSize(changesStartSize(state)));
            dispatch(changeEndSize(changesEndSize(state.dataSmall.dataSmall, state)));
        }
    }
}

export function requestBig() {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.dataBig.dataBig === null) {
            await axios.get(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
                .then(res => {
                    dispatch(requestBigSuccess(res.data));
                    dispatch(requestDataSuccess(res.data));
                    dispatch(changeNewPage(1));
                    dispatch(changeList(page(res.data, state)));
                    dispatch(changePaginations(pagination(res.data)));
                    dispatch(changeSize(changesSize(res.data)));
                    dispatch(changeStartSize(changesStartSize(state)));
                    dispatch(changeEndSize(changesEndSize(res.data, state)));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestDataSuccess(state.dataBig.dataBig));
            dispatch(changeNewPage(1));
            dispatch(changeList(page(state.dataBig.dataBig, state)));
            dispatch(changePaginations(pagination(state.dataBig.dataBig)));
            dispatch(changeSize(changesSize(state.dataBig.dataBig)));
            dispatch(changeStartSize(changesStartSize(state)));
            dispatch(changeEndSize(changesEndSize(state.dataBig.dataBig, state)));
        }
    }
}

export function clickUser(id) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeUser(state.list.list[id]));
        dispatch(changeUserView(true));
        let height = document.querySelector('.scroll').scrollHeight;

        setTimeout(() => {
            window.scrollTo({
                top: height,
                behavior: "smooth"
            });
        });
    }
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        const state = getState();

        if (window.confirm("Удалить пользователя")) {
            const data = state.data.data.concat();
            data.splice(id, 1);
            console.log(data);
            dispatch(requestDataSuccess(data));
            dispatch(changeNewPage(state.newPage.newPage));
            dispatch(changeList(page(data, state)));
            dispatch(changePaginations(pagination(data)));
            dispatch(changePaginatioData(paginationPage(data, state)));
            dispatch(changeSize(changesSize(data)));
            dispatch(changeStartSize(changesStartSize(state)));
            dispatch(changeEndSize(changesEndSize(data, state)));
        }
        else {
            alert("Вы нажали кнопку отмена")
        }
    }
}

export function sortIncrease(id) {
    return (dispatch, getState) => {
        const state = getState();
        const sortItem = state.list.list;

        sortItem.sort(function (a, b) {
            if (a[`${id}`] > b[`${id}`]) {
                return 1;
            }
            if (a[`${id}`] < b[`${id}`]) {
                return -1;
            }
        });

        dispatch(changeList(page(sortItem, state)));
    }
}

export function sortDecrease(id) {
    return (dispatch, getState) => {
        const state = getState();
        const sortItem = state.list.list;

        sortItem.sort(function (a, b) {
            if (a[`${id}`] > b[`${id}`]) {
                return -1;
            }
            if (a[`${id}`] < b[`${id}`]) {
                return 1;
            }
        });

        dispatch(changeList(page(sortItem, state)));
    }
}

export function nextPage(id) {
    return (dispatch, getState) => {
        const state = getState();
        
        dispatch(changeNewPage(id));
        dispatch(changePaginatioData(paginationPage(state.data.data, state)));
        dispatch(changeList(state.paginationData.paginationData, state));
        dispatch(changeStartSize(changesStartSize(state)));
        dispatch(changeEndSize(changesEndSize(state.data.data, state)));
    }
}

export function left() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.newPage.newPage > 1) {
            dispatch(changeNewPage(state.newPage.newPage - 1));
            dispatch(changePaginatioData(paginationPage(state.data.data, state)));
            dispatch(changeList(state.paginationData.paginationData, state));
            dispatch(changeStartSize(changesStartSize(state)));
            dispatch(changeEndSize(changesEndSize(state.data.data, state)));
        }
    }
}

export function right() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.newPage.newPage < Math.ceil(state.data.data.length / 50)) {
            dispatch(changeNewPage(state.newPage.newPage + 1));
            console.log(state);
            dispatch(changePaginatioData(paginationPage(state.data.data, state)));
            dispatch(changeList(state.paginationData.paginationData, state));
            dispatch(changeStartSize(changesStartSize(state)));
            dispatch(changeEndSize(changesEndSize(state.data.data, state)));
        }
    }
}

function page(data, state) {
    let list = [];
    let j = 0;
    for (let i = (state.newPage.newPage - 1) * 50; i < (data.length <= 50 ? data.length : state.newPage.newPage * 50); i++) {
        if (i == data.length) {
            return list;
        }
        else {
            list[j] = data[i];
            j++;
        }
    }
    return list;
}

function pagination(data) {
    let paginations = [];
    for (let i = 0; i < Math.ceil(data.length / 50); i++) {
        paginations[i] = i + 1;
    }
    return paginations;
}

function paginationPage(data, state) {
    let paginationData = state.paginationData.paginationData;
    let newPage = state.newPage.newPage;
    let j = 0;
    console.log(state);
    if (data.length <= 50) {
        paginationData = [];
        newPage = 1;
    }

    for (let i = (newPage - 1) * 50; i < (data.length <= 50 ? data.length : newPage * 50); i++) {
        paginationData[j] = data[i];
        j++;
    }
    console.log(paginationData, newPage);
    return paginationData;
}

function changesSize(data) {
    return data.length;
}

function changesStartSize(state) {
    if(!state.paginationData.paginationData.length) {
        return 0;
    }
    else {
        return state.paginationData.paginationData.length * (state.newPage.newPage - 1);
    }
    
}

function changesEndSize(data, state) {
    if(!state.paginationData.paginationData.length && data.length < 50) {
        return data.length;
    }
    else if(!state.paginationData.paginationData.length && data.length > 50) {
        return 50;
    }
    else if (state.paginationData.paginationData.length * state.newPage.newPage > data.length) {
        return data.length;
    }
    else if(state.paginationData.paginationData.length * state.newPage.newPage < data.length) {
        return state.paginationData.paginationData.length * state.newPage.newPage;
    }
}

export function changeUser(arrUser) {
    return {
        type: user,
        arrUser
    }
}

export function changeUserView(booleanView) {
    return {
        type: userView,
        booleanView
    }
}

export function changeSize(numberSize) {
    return {
        type: size,
        numberSize
    }
}

export function changeStartSize(numberStartSize) {
    return {
        type: startSize,
        numberStartSize
    }
}

export function changeEndSize(numberEndSize) {
    return {
        type: endSize,
        numberEndSize
    }
}

export function changeNewPage(numberNewPage) {
    console.log(numberNewPage);
    return {
        type: newPage,
        numberNewPage
    }
}

export function changeList(arrList) {
    return {
        type: list,
        arrList
    }
}

export function changePaginations(arrPaginations) {
    return {
        type: paginations,
        arrPaginations
    }
}

export function changePaginatioData(arrPaginationData) {
    return {
        type: paginationData,
        arrPaginationData
    }
}

export function requestBigSuccess(arrDataBig) {
    return {
        type: big,
        arrDataBig
    }
}

export function requestSmallSuccess(arrDataSmall) {
    return {
        type: small,
        arrDataSmall
    }
}

export function requestDataSuccess(arrData) {
    return {
        type: data,
        arrData
    }
}