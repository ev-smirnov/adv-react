import React, {Component} from 'react';
import { Route, NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import SignInForm from '../auth/SignInForm';
import SignUpForm from '../auth/SignUpForm';
import { signUp, moduleName } from '../../ducks/auth';
import Loader from '../common/Loader';

class AuthPage extends Component {
  handleSignIn = (values) => {
    console.log('---', values);
  }

  handleSignUp = ({ email, password }) => {
    this.props.signUp(email, password)
  }

  render() {
    const { loading } = this.props
    return (
      <div>
        <h1>Auth Page</h1>
        <NavLink to="/auth/signin" activeStyle={{ backgroundColor: 'lightgray' }}>Sign In</NavLink>
        <NavLink to="/auth/signup" activeStyle={{ backgroundColor: 'lightgray' }}>Sign Up</NavLink>
        <Route path="/auth/signin" render={() => <SignInForm onSubmit={this.handleSignIn} />} />
        <Route path="/auth/signup" render={() => <SignUpForm onSubmit={this.handleSignUp} />} />
        {loading && <Loader />}
      </div>
    );
  }
}

AuthPage.propTypes = {};
AuthPage.defaultProps = {};

export default connect((state) => ({
  loading: state[moduleName].loading
}), { signUp })(AuthPage);
