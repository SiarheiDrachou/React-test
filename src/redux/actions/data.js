import axios from 'axios';
import {
    small,
    big,
    data,
    list,
    paginations,
    newPage,
    size,
    startSize,
    endSize,
    user,
    userView,
    addContacts,
    key
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
                    dispatch(changeList(page(res.data, 1)));
                    dispatch(changePaginations(pagination(res.data)));
                    dispatch(changeSize(sizes(res.data)));
                    dispatch(changeStartSize(startSizes(res.data, 1)));
                    dispatch(changeEndSize(endSizes(res.data, res.data, 1)));
                    dispatch(changeUserView(false));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestDataSuccess(state.dataSmall.dataSmall));
            dispatch(changeNewPage(1));
            dispatch(changeList(page(state.dataSmall.dataSmall, 1)));
            dispatch(changePaginations(pagination(state.dataSmall.dataSmall)));
            dispatch(changeSize(sizes(state.dataSmall.dataSmall)));
            dispatch(changeStartSize(startSizes(state.list.list, 1)));
            dispatch(changeEndSize(endSizes(state.dataSmall.dataSmall, state.dataSmall.dataSmall, 1)));
            dispatch(changeUserView(false));
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
                    dispatch(changeList(page(res.data, 1)));
                    dispatch(changePaginations(pagination(res.data)));
                    dispatch(changeSize(sizes(res.data)));
                    dispatch(changeStartSize(startSizes(res.data, state.newPage.newPage)));
                    dispatch(changeEndSize(endSizes(page(res.data, 1), res.data, state.newPage.newPage)));
                    dispatch(changeUserView(false));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestDataSuccess(state.dataBig.dataBig));
            dispatch(changeNewPage(1));
            dispatch(changeList(page(state.dataBig.dataBig, 1)));
            dispatch(changePaginations(pagination(state.dataBig.dataBig)));
            dispatch(changeSize(sizes(state.dataBig.dataBig)));
            dispatch(changeStartSize(startSizes(state.list.list, state.newPage.newPage)));
            dispatch(changeEndSize(endSizes(page(state.dataBig.dataBig, 1), state.dataBig.dataBig, state.newPage.newPage)));
            dispatch(changeUserView(false));
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
        dispatch(changeUserView(false));
        if (window.confirm("Удалить пользователя")) {
            const data = state.data.data;
            data.splice(((state.newPage.newPage - 1) * 50) + id, 1);
            
            dispatch(requestDataSuccess(data));
            dispatch(changeList(page(data, state.newPage.newPage)));
            dispatch(changeSize(sizes(data)));
            dispatch(changeStartSize(startSizes(page(data, state.newPage.newPage), state.newPage.newPage)));
            dispatch(changeEndSize(endSizes(page(data, state.newPage.newPage), data, state.newPage.newPage)));
            dispatch(changePaginations(pagination(data)));
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

        dispatch(changeList(page(sortItem, state.newPage.newPage)));
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

        dispatch(changeList(page(sortItem, state.newPage.newPage)));
    }
}

export function nextPage(id) {
    return (dispatch, getState) => {
        const state = getState();
        
        dispatch(changeNewPage(id));
        dispatch(changeList(page(state.data.data, id)));
        dispatch(changeStartSize(startSizes(page(state.data.data, id), id)));
        dispatch(changeEndSize(endSizes(page(state.data.data, id), state.data.data, id)));
        dispatch(changeUserView(false));
    }
}

export function left() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.newPage.newPage > 1) {
            dispatch(changeNewPage(state.newPage.newPage - 1));
            dispatch(changeList(page(state.data.data, state.newPage.newPage - 1)));
            dispatch(changeStartSize(startSizes(page(state.data.data, state.newPage.newPage - 1), state.newPage.newPage - 1)));
            dispatch(changeEndSize(endSizes(page(state.data.data, state.newPage.newPage - 1), state.data.data, state.newPage.newPage - 1)));
            dispatch(changeUserView(false));
        }
    }
}

export function right() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.newPage.newPage < Math.ceil(state.data.data.length / 50)) {
            dispatch(changeNewPage(state.newPage.newPage + 1));
            dispatch(changeList(page(state.data.data, state.newPage.newPage + 1)));
            dispatch(changeStartSize(startSizes(page(state.data.data, state.newPage.newPage + 1), state.newPage.newPage + 1)));
            dispatch(changeEndSize(endSizes(page(state.data.data, state.newPage.newPage + 1), state.data.data, state.newPage.newPage + 1)));
            dispatch(changeUserView(false));
        }
    }
}

export function submitContact() {
    return (dispatch, getState) => {
        const state = getState();
        let newData = [];
        let newUser = new Object();
        if(
            document.querySelector('.form')[0].value &&
            document.querySelector('.form')[1].value &&
            document.querySelector('.form')[2].value &&
            document.querySelector('.form')[3].value &&
            document.querySelector('.form')[4].value &&
            document.querySelector('.form')[5].value &&
            document.querySelector('.form')[6].value &&
            document.querySelector('.form')[7].value &&
            document.querySelector('.form')[8].value
        ) {
            newUser['id'] = document.querySelector('.form')[0].value;
            newUser['firstName'] = document.querySelector('.form')[1].value;
            newUser['lastName'] = document.querySelector('.form')[2].value;
            newUser['phone'] = document.querySelector('.form')[3].value;
            newUser['email'] = document.querySelector('.form')[4].value;
            newUser['address'] = new Object();
            newUser['address']['city'] = document.querySelector('.form')[5].value;
            newUser['address']['state'] = document.querySelector('.form')[6].value;
            newUser['address']['streetAddress'] = document.querySelector('.form')[7].value;
            newUser['address']['zip'] = document.querySelector('.form')[8].value;
            newData = [...state.data.data];
            newData.push(newUser);

            dispatch(requestDataSuccess(newData));
            dispatch(changeList(page(newData, state.newPage.newPage)));
            dispatch(changeSize(sizes(newData)));
            dispatch(changeStartSize(startSizes(page(newData, state.newPage.newPage), state.newPage.newPage)));
            dispatch(changeEndSize(endSizes(page(newData, state.newPage.newPage), newData, state.newPage.newPage)));
            dispatch(changePaginations(pagination(newData)));
            dispatch(changeAdd(false));
        }
        else {
            alert('Заполните все поля!!!');
        }
    }
}

export function viewForm() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeKeys(addKeys(state.data.data)));
        dispatch(changeAdd(true));
    }
}

export function search() {
    return (dispatch, getState) => {
        const state = getState();

        let j = 0;
        let results = [];
        let find = document.querySelector('.searchInput').value;

        for(let i = 0; i < state.data.data.length; i++) {
            for(let key in state.data.data[i]) {
                let dataItem = state.data.data[i];
                if(dataItem[key].toString().indexOf(`${find}`)!==-1) {
                    results[j] = state.data.data[i];
                    j++;
                }
            }
        }

        if(results.length == 0) {
            alert('Ничего не найдено');
        }
        else {
            dispatch(requestDataSuccess(results));
            dispatch(changeList(page(results, 1)));
            dispatch(changeSize(sizes(results)));
            dispatch(changeStartSize(startSizes(page(results, 1), 1)));
            dispatch(changeEndSize(endSizes(page(results, 1), results, 1)));
            dispatch(changePaginations(pagination(results)));
        }
    }
}

export function cancel() {
    return (dispatch) => {
        dispatch(changeAdd(false));
    }
}

function addKeys(data) {
    let arrKeys = [];
    
    arrKeys.push(...Object.keys(data[0]), ...Object.keys(data[0]['address']));
    arrKeys.splice(5, 2);
    arrKeys.push('description');

    return arrKeys;
}

function page(data, page) {
    let list = [];
    let j = 0;
    for (let i = (page - 1) * 50; i < (data.length <= 50 ? data.length : page * 50); i++) {
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

function sizes(data) {
    return data.length;
}

function startSizes(list, page) {
    if(list.length < 50) {
        return 0;
    }
    else {
        return list.length * (page - 1);
    }
    
}

function endSizes(list, data, page) {
    if(data.length < list.length * page) {
        return data.length;
    }
    else if(list.length < 50) {
        return list.length;
    }
    else {
        return list.length * page;
    }
}

export function changeKeys(arrKeys) {
    return {
        type: key,
        arrKeys
    }
}

export function changeAdd(booleanAdd) {
    return {
        type: addContacts,
        booleanAdd
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