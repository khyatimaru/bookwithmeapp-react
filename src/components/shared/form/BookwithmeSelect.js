import React from 'react';

export const BookwithmeSelect = ({
    input,
    label,
    type,
    className,
    options,
    meta: { touched, error, warning }
}) => {

    function renderOptions() {
        return options.map((option, index) => {
            return <option key={index} value={option}>{option}</option>
        });
    }
    return(
        <div className='form-group'>
            <label>{label}</label>
            <div className='input-group'>
                <select {...input} type={type} className={className} >
                    {renderOptions()}
                </select>
                </div>

            {touched &&
            (error && <div className='alert alert-danger'>{error}</div>)}
        </div>
    );
}

