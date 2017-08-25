import React, {Component} from 'react';
import { Route, NavLink } from 'react-router-dom'
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';

class AuthPage extends Component {
  handleSignIn = (values) => {
    console.log('---', values);
  }

  handleSignUp = (values) => {
    console.log('---', values);
  }

  render() {
    return (
      <div>
        <h1>Auth Page</h1>
        <NavLink to="/auth/signin" activeStyle={{ backgroundColor: 'lightgray' }}>Sign In</NavLink>
        <NavLink to="/auth/signup" activeStyle={{ backgroundColor: 'lightgray' }}>Sign Up</NavLink>
        <Route path="/auth/signin" render={() => <SignInForm onSubmit={this.handleSignIn} />} />
        <Route path="/auth/signup" render={() => <SignUpForm onSubmit={this.handleSignUp} />} />
      </div>
    );
  }
}

AuthPage.propTypes = {};
AuthPage.defaultProps = {};

export default AuthPage;
