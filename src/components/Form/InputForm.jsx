import React from 'react';
import './InputForm.scss'

const inputForm = props => (
    <input
        className="form__input"
        type="text" 
        placeholder={props.input}
    />
)

export default inputForm