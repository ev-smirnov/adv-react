import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import { addEventToPerson, personListSelector } from '../../ducks/people';

class SelectedEventCard extends Component {
  render() {
    const { event, connectDropTarget, canDrop, hovered, people } = this.props;
    const { title, when, where } = event;
    const dropStyle = {
      border: `1px solid ${canDrop ? 'red' : 'black'}`,
      backgroundColor: hovered ? 'green' : 'white',
    };
    const peopleElement = <p>{people.map(({ email }) => email).join(', ')}</p>;
    return connectDropTarget(
      <div style={dropStyle}>
        <h3>{title}</h3>
        <p>{when}, {where}</p>
        {peopleElement}
      </div>
    );
  }
}

SelectedEventCard.propTypes = {};
SelectedEventCard.defaultProps = {};

const spec = {
  drop(props, monitor) {
    const personUid = monitor.getItem().uid;
    const eventUid = props.event.uid;

    props.addEventToPerson(eventUid, personUid);

    return {
      uid: eventUid,
    }
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver(),
});

export default connect((state, props) => ({
  people: personListSelector(state).filter(({ events }) => events.includes(props.event.uid)),
}), { addEventToPerson })(DropTarget(['person'], spec, collect)(SelectedEventCard));
