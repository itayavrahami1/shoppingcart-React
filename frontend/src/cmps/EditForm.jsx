// Render Prop
import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const EditForm = ({ toy }) => {

    const onSubmit = (values, { setSubmitting }) => {
        setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
        }, 400);
    }
    const initialValues = { name: toy.name || '', price: toy.price || '', type: toy.type || '' }
    const values = { name: toy.name || '', price: toy.price || '', type: toy.type || '' }
    return (
        <div>
            <Formik
                initialValues={initialValues}
                values={values}
                validate={values => {
                    const errors = {};
                    debugger
                    if (!values.name || !values.price || !values.type) {
                        errors.name = 'Required';
                        errors.price = 'Required';
                        errors.type = 'Required';
                    } else if (
                        !/\d/.test(values.price)
                    ) {
                        errors.price = 'Invalid Price - Must contain only digits';
                    }
                    return errors;
                }}
                onSubmit={onSubmit}
            >
                {({ isSubmitting, handleChange,values}) => (
                    <Form>
                        <label htmlFor="name">Toy's Name</label>
                        <Field  type="name" name="name" 
                        value={values.name} onChange={handleChange}/>
                        <ErrorMessage name="name" component="div" />
                        <label htmlFor="price">To'ys Price</label>
                        <Field type="price" name="price" 
                        value={values.price} onChange={handleChange}/>
                        <ErrorMessage name="price" component="div" />
                        <label htmlFor="type">Toy's Type</label>
                        {/* <Field component="select" id="Type" name="Type" multiple={true}  */}
                        <Field name="type" as="select" id="type"
                        value={values.type} onChange={handleChange}>
                            <option value="Funny">Funny</option>
                            <option value="Educational">Educational</option>
                            <option value="Adult">Adult</option>
                        </Field>
                        <ErrorMessage name="type" component="div" />
                        <button type="submit" disabled={isSubmitting}>
                            Submit
                    </button>
                    </Form>
                )}
            </Formik>
        </div>)
};