import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import emailValidator from 'email-validator';
import ErrorField from '../common/ErrorField';

class SignInForm extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <h2>New Person</h2>
        <form onSubmit={handleSubmit}>
          <Field name="firstName" component={ErrorField} />
          <Field name="lastName" component={ErrorField} />
          <Field name="email" component={ErrorField} />
          <div>
            <input type="submit" />
          </div>
        </form>
      </div>
    );
  }
}

SignInForm.propTypes = {};
SignInForm.defaultProps = {};

const validate = ({ firstName, lastName, email }) => {
  const errors = {};

  if (!firstName) {
    errors.firstName = 'firstName is required'
  }

  if (!lastName) {
    errors.lastName = 'lastName is required'
  }

  if (!email) {
    errors.email = 'email is required'
  } else if (!emailValidator.validate(email)) {
    errors.email = 'invalid email'
  }

  return errors
};

export default reduxForm({
  form: 'person',
  validate,
})(SignInForm);
