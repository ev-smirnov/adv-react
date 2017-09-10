import React, {Component} from 'react';
import PersonList from '../people/PersonList';
import EventListVirtualized from '../events/EventListVirtualized';
import SelectedEvents from '../events/SelectedEvents';

class AdminPage extends Component {
  render() {
    return (
      <div>
        <h1>Admin Page</h1>
        <PersonList />
        <SelectedEvents />
        <EventListVirtualized />
      </div>
    );
  }
}

AdminPage.propTypes = {};
AdminPage.defaultProps = {};

export default AdminPage;
