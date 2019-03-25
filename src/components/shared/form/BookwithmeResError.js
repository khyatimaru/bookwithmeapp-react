import React from 'react';

export function BookwithmeResError(props) {
    const errors = props.errors;

    if(!errors) {
        return false;
    }
    return (
    errors.length > 0 &&
            <div className='alert alert-danger bookwithme-res-errors'>
                {errors.map((error, index) => <p key={index}> {error.detail} </p>)}
            </div>
    );

}