import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { moduleName } from '../../ducks/auth';
import UnAuthorized from './UnAuthorized';

class ProtectedRoute extends Component {
  renderProtected = (routeProps) => {
    const { component: ProtectedComponent, authorized } = this.props
    return authorized ? <ProtectedComponent {...routeProps} /> : <UnAuthorized />;
  }

  render() {
    const { component, ...rest } = this.props
    return (
      <Route {...rest} render={this.renderProtected} />
    );
  }
}

ProtectedRoute.propTypes = {};
ProtectedRoute.defaultProps = {};

export default connect((state) => ({
  authorized: !!state[moduleName].user,
  router: state.router,
}))(ProtectedRoute);
