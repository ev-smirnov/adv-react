import React, {Component} from 'react';
import PersonList from '../people/PersonList';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <PersonList />
      </div>
    );
  }
}

AdminPage.propTypes = {};
AdminPage.defaultProps = {};

export default AdminPage;
