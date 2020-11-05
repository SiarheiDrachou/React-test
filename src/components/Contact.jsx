import React from 'react';

const Contact = props => (
    <div className="information">
        Выбран пользователь <b>{props.userData.firstName} {props.userData.lastName}</b>
        <br />
            Описание:
        <br />
        <textarea defaultValue={props.userData.description}></textarea>
        <br />
            Адрес проживания: <b>{props.userData.address.streetAddress}</b>
        <br />
            Город: <b>{props.userData.address.city}</b>
        <br />
            Провинция/штат: <b>{props.userData.address.state}</b>
        <br />
            Индекс: <b>{props.userData.address.zip}</b>
    </div>
)

export default Contact