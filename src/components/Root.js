import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom'
import { moduleName, signOut } from '../ducks/auth';
import ProtectedRoute from './common/ProtectedRoute';
import AdminPage from './routes/AdminPage';
import PeoplePage from './routes/PeoplePage';
import AuthPage from './routes/AuthPage';


class Root extends Component {
  render() {
    const { signedIn, signOut } = this.props;
    const btn = signedIn
      ? <button onClick={signOut}>Sign Out</button>
      : <Link to="/auth/signin">Sign In</Link>

    return (
      <div>
        {btn}
        <ProtectedRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/people" component={PeoplePage} />
        <Route path="/auth" component={AuthPage} />
      </div>
    );
  }
}

export default connect(state => ({
  signedIn: !!state[moduleName].user,
  router: state.router,
}), { signOut })(Root);
