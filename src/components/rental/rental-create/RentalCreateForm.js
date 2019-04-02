import React from 'react';
import { Field, reduxForm } from 'redux-form';
import {BookwithmeInput} from 'components/shared/form/BookwithmeInput';
import {BookwithmeTextArea} from 'components/shared/form/BookwithmeTextArea';
import {BookwithmeSelect} from 'components/shared/form/BookwithmeSelect';
import {BookwithmeFileUpload} from 'components/shared/form/BookwithmeFileUpload';

import { BookwithmeResError } from 'components/shared/form/BookwithmeResError';

const RentalCreateForm = props => {
    const { handleSubmit, pristine, submitting, submitCb, valid, errors, options} = props;

    return (
        <form onSubmit={handleSubmit(submitCb)}>
            <Field
                name='title'
                type='text'
                className='form-control'
                label='Title'
                component = {BookwithmeInput}
            />

            <Field
                name='description'
                type='text'
                rows='2'
                className='form-control'
                label='Description'
                component={BookwithmeTextArea}
            />

            <Field
                name='city'
                type='text'
                className='form-control'
                label='City'
                component = {BookwithmeInput}
            />

            <Field
                name='street'
                type='text'
                className='form-control'
                label='Street'
                component={BookwithmeInput}
            />

            <Field
                name='category'
                className='form-control'
                label='Category'
                options = {options}
                component={BookwithmeSelect}
            />

            <Field
                name='image'
                label='Image'
                component={BookwithmeFileUpload}
            />

            <Field
                name='bedrooms'
                type='number'
                className='form-control'
                label='Bedrooms'
                component={BookwithmeInput}
            />

            <Field
                name='dailyRate'
                type='number'
                className='form-control'
                label='Daily Rate'
                symbol='$'
                component={BookwithmeInput}
            />

            <Field
                name='shared'
                className='form-control'
                component={BookwithmeInput}
                type='checkbox'
                label='Shared'
            />
            <button type='submit' disabled={pristine || submitting || !valid} className='btn btn-bookwithme btn-form'>Create Rental</button>

            <BookwithmeResError errors = {errors} / >

        </form>
    );
}

export default reduxForm({
    form:'rentalCreateForm',
    initialValues: {shared: false, category:'apartment'}
})(RentalCreateForm)
