import React, {Component} from 'react';
import { Route } from 'react-router-dom'
import ProtectedRoute from './common/ProtectedRoute';
import AdminPage from './routes/AdminPage';
import PeoplePage from './routes/PeoplePage';
import AuthPage from './routes/AuthPage';


class Root extends Component {
  render() {
    return (
      <div>
        <ProtectedRoute path="/admin" component={AdminPage} />
        <ProtectedRoute path="/people" component={PeoplePage} />
        <Route path="/auth" component={AuthPage} />
      </div>
    );
  }
}

export default Root;
