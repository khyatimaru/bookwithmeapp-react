import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {BookwithmeInput} from 'components/shared/form/BookwithmeInput';
import { BookwithmeResError } from 'components/shared/form/BookwithmeResError';

const RegisterForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;

    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field
                name='username'
                type='text'
                className='form-control'
                label='Username'
                component = {BookwithmeInput}
            />

            <Field
                name='email'
                type='email'
                className='form-control'
                label='Email'
                component = {BookwithmeInput}
            />

            <Field
                name='password'
                type='password'
                className='form-control'
                label='Password'
                component={BookwithmeInput}
            />

            <Field
                name='passwordConfirmation'
                type='password'
                className='form-control'
                label='Password Confirmation'
                component={BookwithmeInput}
            />

            <button type='submit' disabled={pristine || submitting || !valid} className='btn btn-bookwithme btn-form'>Register</button>

            <BookwithmeResError errors = {errors} / >

        </form>
    );
}

const validate = values => {
    const errors = {}
    if (!values.username) {
        errors.username = 'Username is Required'
    }
    else if (values.username && values.username.length < 4) {
        errors.username = 'Username min length is 4 characters!';
    }else if (values.username.length > 32) {
        errors.username = 'Must be 32 characters or less'
    }
    if (!values.email) {
        errors.email = 'Please enter email!'
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
    }
    if (!values.password) {
        errors.password = 'Please enter Password!'
    }
    if (!values.passwordConfirmation) {
        errors.passwordConfirmation = 'Please enter Password Confirmation!'
    }
     if (values.password !== values.passwordConfirmation) {
        errors.password = 'Passwords must match!'
    }
    return errors;
}
export default reduxForm({
    form:'registerForm',
    validate
})(RegisterForm)
