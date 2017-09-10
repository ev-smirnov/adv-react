import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectedEventsSelector } from '../../ducks/events';
import SelectedEventCard from './SelectedEventCard';

class SelectedEvents extends Component {
  render() {
    const { events } = this.props;

    return (
      <div>
        {events.map(event => (<SelectedEventCard event={event} key={event.uid} />))}
      </div>
    );
  }
}

SelectedEvents.propTypes = {};
SelectedEvents.defaultProps = {};

export default connect(state => ({
  events: selectedEventsSelector(state),
}))(SelectedEvents);
