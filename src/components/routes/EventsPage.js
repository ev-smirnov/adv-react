import React, { Component } from 'react';
import EventList from '../events/EventListTable';

class EventsPage extends Component {
  render() {
    return (
      <div>
        <h1>Events Page</h1>
        <EventList />
      </div>
    );
  }
}

EventsPage.propTypes = {};
EventsPage.defaultProps = {};

export default EventsPage;
