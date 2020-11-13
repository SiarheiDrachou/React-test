import React from 'react';
import './InputForm.scss'

const inputForm = props => (
    props.input == 'description' 
    ?
    <textarea 
        className="form__input"
        rows="2"
        defaultValue="Description"
    ></textarea>
    : 
    <input
        className="form__input"
        type="text" 
        placeholder={props.input}
    />
)

export default inputForm