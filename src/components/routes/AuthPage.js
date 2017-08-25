import React, {Component} from 'react';
import PropTypes from 'prop-types';
import SigninForm from '../auth/SigninForm';

class AuthPage extends Component {
  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <SigninForm />
      </div>
    );
  }
}

AuthPage.propTypes = {};
AuthPage.defaultProps = {};

export default AuthPage;
