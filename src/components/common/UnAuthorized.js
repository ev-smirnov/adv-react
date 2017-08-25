import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UnAuthorized extends Component {
  render() {
    return (
      <div>
        <h2>Unauthorized, please <Link to="/auth/signin">Sign In</Link></h2>
      </div>
    );
  }
}

UnAuthorized.propTypes = {};
UnAuthorized.defaultProps = {};

export default UnAuthorized;
