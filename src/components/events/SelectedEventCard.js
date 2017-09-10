import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

class SelectedEventCard extends Component {
  render() {
    const { event, connectDropTarget, canDrop, hovered } = this.props;
    const { title, when, where } = event;
    const dropStyle = {
      border: `1px solid ${canDrop ? 'red' : 'black'}`,
      backgroundColor: hovered ? 'green' : 'white',
    };
    return connectDropTarget(
      <div style={dropStyle}>
        <h3>{title}</h3>
        <p>{when}, {where}</p>
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

    console.log('---', 'person', personUid, 'event', eventUid);
  }
};

const collect = (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  canDrop: monitor.canDrop(),
  hovered: monitor.isOver(),
});

export default DropTarget(['person'], spec, collect)(SelectedEventCard);
