import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {BookwithmeInput} from 'components/shared/form/BookwithmeInput';
import { BookwithmeResError } from 'components/shared/form/BookwithmeResError';
import { required, minLength4 } from 'components/shared/form/validators';

const LoginForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors } = props;

    return (
        <form onSubmit={handleSubmit(submitCb)}>

            <Field
                name='email'
                type='email'
                className='form-control'
                label='Email'
                component = {BookwithmeInput}
                validate={[required, minLength4]}
            />

            <Field
                name='password'
                type='password'
                className='form-control'
                label='Password'
                component={BookwithmeInput}
                validate={[required]}
            />

            <button type='submit' disabled={pristine || submitting || !valid} className='btn btn-bookwithme btn-form'>Login</button>

            <BookwithmeResError errors = {errors} / >

        </form>
    );
}
export default reduxForm({
    form:'loginForm',
})(LoginForm)
