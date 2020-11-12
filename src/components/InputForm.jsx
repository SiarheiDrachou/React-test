import React from 'react';

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
        type="text" 
        placeholder={props.input}
    />
)

export default inputForm