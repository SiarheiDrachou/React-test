import React from 'react';
import './Contact.scss'

const Contact = props => (
    <div className="information">
        {
            props.userData.firstName === undefined || props.userData.lastName === undefined
            ? null
            : <span>
                Выбран пользователь <b>{props.userData.firstName} {props.userData.lastName}</b>
            </span>
        }
        
        {
            props.userData.description === undefined
            ? null
            : <span>
                <br />
                    Описание:
                <br />
                <textarea defaultValue={props.userData.description} disabled></textarea>
            </span>
        }

        {
            props.userData.address === undefined
            ? null
            : <div>
                <br />
                Адрес проживания: <b>{props.userData.address.streetAddress}</b>
                <br />
                Город: <b>{props.userData.address.city}</b>
                <br />
                Провинция/штат: <b>{props.userData.address.state}</b>
                <br />
                Индекс: <b>{props.userData.address.zip}</b>
            </div>
        }
    </div>
)

export default Contact