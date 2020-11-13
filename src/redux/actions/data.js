import axios from 'axios';
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
    searchUser
} from './actionTypes'

export function requestSmall() {
    return async (dispatch, getState) => {
        const state = getState();

        if (state.variables.dataSmall === null) {
            await axios.get(`http://www.filltext.com/?rows=33&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|5}`)
                .then(res => {
                    dispatch(requestSmallSuccess(
                        res.data, 
                        1, 
                        sizes(res.data), 
                        startSizes(res.data, 1), 
                        endSizes(res.data, res.data, 1),
                        page(res.data, 1),
                        pagination(res.data),
                        false
                    ));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestSmallSuccess(
                state.variables.dataSmall, 
                1, 
                sizes(state.variables.dataSmall), 
                startSizes(state.variables.list, 1), 
                endSizes(state.variables.dataSmall, state.variables.dataSmall, 1),
                page(state.variables.dataSmall, 1),
                pagination(state.variables.dataSmall),
                false
            ));
        }
    }
}

export function requestBig() {
    return async (dispatch, getState) => {
        const state = getState();
        if (state.variables.dataBig === null) {
            await axios.get(`http://www.filltext.com/?rows=1000&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`)
                .then(res => {
                    dispatch(requestBigSuccess(
                        res.data, 
                        1, 
                        sizes(res.data), 
                        startSizes(res.data, 1), 
                        endSizes(page(res.data, 1), res.data, 1),
                        page(res.data, 1),
                        pagination(res.data),
                        false
                    ));
                })
                .catch(e => console.log(e));
        }
        else {
            dispatch(requestBigSuccess(
                state.variables.dataBig, 
                1, 
                sizes(state.variables.dataBig), 
                startSizes(state.variables.list, 1), 
                endSizes(page(state.variables.dataBig, 1), state.variables.dataBig, 1),
                page(state.variables.dataBig, 1),
                pagination(state.variables.dataBig),
                false
            ));
        }
    }
}

export function clickUser(id) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeUser(state.variables.list[id], true));

        scroll();
    }
}

export function deleteUser(id) {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeUserView(false));

        if (window.confirm("Удалить пользователя")) {
            const data = state.variables.data;

            data.splice(((state.variables.newPage - 1) * 50) + id, 1);

            dispatch(changeDeleteUser(
                data,
                page(data, state.variables.newPage),
                sizes(data),
                startSizes(page(data, state.variables.newPage), state.variables.newPage),
                endSizes(page(data, state.variables.newPage), data, state.variables.newPage),
                pagination(data)
            ));
        }
        else {
            alert("Вы нажали кнопку отмена")
        }
    }
}

export function sortIncrease(id) {
    return (dispatch, getState) => {
        const state = getState();
        const sortItem = state.variables.list;

        sortItem.sort(function (a, b) {
            if (a[`${id}`] > b[`${id}`]) {
                return 1;
            }
            if (a[`${id}`] < b[`${id}`]) {
                return -1;
            }
        });

        dispatch(changeList(page(sortItem, state.variables.newPage)));
    }
}

export function sortDecrease(id) {
    return (dispatch, getState) => {
        const state = getState();
        const sortItem = state.variables.list;

        sortItem.sort(function (a, b) {
            if (a[`${id}`] > b[`${id}`]) {
                return -1;
            }
            if (a[`${id}`] < b[`${id}`]) {
                return 1;
            }
        });

        dispatch(changeList(page(sortItem, state.variables.newPage)));
    }
}

export function nextPage(id) {
    return (dispatch, getState) => {
        const state = getState();
        
        dispatch(changeNewPage(
            id,
            page(state.variables.data, id),
            startSizes(page(state.variables.data, id), id),
            endSizes(page(state.variables.data, id), state.variables.data, id),
            false
        ));
    }
}

export function left() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.variables.newPage > 1) {
            dispatch(changeNewPage(
                state.variables.newPage - 1,
                page(state.variables.data, state.variables.newPage - 1),
                startSizes(page(state.variables.data, state.variables.newPage - 1), state.variables.newPage - 1),
                endSizes(page(state.variables.data, state.variables.newPage - 1), state.variables.data, state.variables.newPage - 1),
                false
            ));
        }
    }
}

export function right() {
    return (dispatch, getState) => {
        const state = getState();

        if (state.variables.newPage < Math.ceil(state.variables.data.length / 50)) {
            dispatch(changeNewPage(
                state.variables.newPage + 1,
                page(state.variables.data, state.variables.newPage + 1),
                startSizes(page(state.variables.data, state.variables.newPage + 1), state.variables.newPage + 1),
                endSizes(page(state.variables.data, state.variables.newPage + 1), state.variables.data, state.variables.newPage + 1),
                false
            ));
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
            newData = [...state.variables.data];
            newData.push(newUser);

            dispatch(changeAddUser(
                newData,
                page(newData, state.variables.newPage),
                sizes(newData),
                startSizes(page(newData, state.variables.newPage), state.variables.newPage),
                endSizes(page(newData, state.variables.newPage), newData, state.variables.newPage),
                pagination(newData),
                false
            ));
        }
        else {
            alert('Заполните все поля!!!');
        }
    }
}

export function viewForm() {
    return (dispatch, getState) => {
        const state = getState();

        dispatch(changeAdd(true, addKeys(state.variables.data)));
    }
}

export function search() {
    return (dispatch, getState) => {
        const state = getState();

        let j = 0;
        let results = [];
        let find = document.querySelector('.searchInput').value;

        for(let i = 0; i < state.variables.data.length; i++) {
            for(let key in state.variables.data[i]) {
                let dataItem = state.variables.data[i];
                if(dataItem[key].toString().indexOf(`${find}`)!==-1) {
                    results[j] = state.variables.data[i];
                    j++;
                }
            }
        }

        if(results.length == 0) {
            alert('Ничего не найдено');
        }
        else {
            dispatch(changeSearchUser(
                results,
                page(results, 1),
                1,
                sizes(results),
                startSizes(page(results, 1), 1),
                endSizes(page(results, 1), results, 1),
                pagination(results)
            ));
        }
    }
}

export function cancel() {
    return (dispatch) => {
        dispatch(changeAdd(false, []));
    }
}

function scroll() {
    let height = document.querySelector('.scroll').scrollHeight;

    setTimeout(() => {
        window.scrollTo({
            top: height,
            behavior: "smooth"
        });
    });
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

export function changeSearchUser(
    arrData,
    arrList,
    numberNewPage,
    numberSize,
    numberStartSize, 
    numberEndSize,
    arrPaginations
) {
    return {
        type: searchUser,
        arrData,
        arrList,
        numberSize,
        numberStartSize, 
        numberEndSize,
        arrPaginations,
        numberNewPage
    }
}

export function changeAdd(booleanAdd, arrKeys ) {
    return {
        type: addContacts,
        booleanAdd, 
        arrKeys
    }
}

export function changeAddUser(
    arrData,
    arrList,
    numberSize,
    numberStartSize, 
    numberEndSize,
    arrPaginations,
    booleanAdd
) {
    return {
        type: addNewUser,
        arrData,
        arrList,
        numberSize,
        numberStartSize, 
        numberEndSize,
        arrPaginations,
        booleanAdd
    }
}

export function changeUser(arrUser, booleanView) {
    return {
        type: user,
        arrUser,
        booleanView
    }
}

export function changeUserView(booleanView) {
    return {
        type: userView,
        booleanView
    }
}

export function changeNewPage(
    numberNewPage,
    arrList,
    numberStartSize,
    numberEndSize,
    booleanUserView
) {
    return {
        type: newPage,
        numberNewPage,
        arrList,
        numberStartSize,
        numberEndSize,
        booleanUserView
    }
}

export function changeList(arrList) {
    return {
        type: list,
        arrList
    }
}

export function requestBigSuccess(
    arrDataBig, 
    numberNewPage, 
    numberSize, 
    numberStartSize, 
    numberEndSize,
    arrList,
    arrPaginations,
    booleanUserView
) {
    return {
        type: big,
        arrDataBig, 
        numberNewPage, 
        booleanUserView,
        numberSize, 
        numberStartSize, 
        numberEndSize,
        arrList,
        arrPaginations
    }
}

export function requestSmallSuccess(
    arrDataSmall, 
    numberNewPage, 
    numberSize, 
    numberStartSize, 
    numberEndSize,
    arrList,
    arrPaginations,
    booleanUserView
) {
    return {
        type: small,
        arrDataSmall, 
        numberNewPage, 
        booleanUserView,
        numberSize, 
        numberStartSize, 
        numberEndSize,
        arrList,
        arrPaginations
    }
}

export function changeDeleteUser(
    arrData,
    arrList,
    numberSize, 
    numberStartSize, 
    numberEndSize,
    arrPaginations
) {
    return {
        type: deleteUsers,
        arrData,
        numberSize, 
        numberStartSize, 
        numberEndSize,
        arrList,
        arrPaginations
    }
}