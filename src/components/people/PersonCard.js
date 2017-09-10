import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

class PersonCard extends Component {
  render() {
    const { person, style, connectDragSource, isDragging } = this.props;
    const dragStyle = {
      backgroundColor: isDragging ? 'gray' : 'white',
    };
    return (
      <div style={{ width: 200, height: 100, ...dragStyle, ...style }}>
        {connectDragSource(<h3>{person.firstName}&nbsp;{person.lastName}</h3>)}
        <p>{person.email}</p>
      </div>
    )
  }
}

PersonCard.propTypes = {};
PersonCard.defaultProps = {};

const spec = {
  beginDrag(props) {
    return {
      uid: props.person.uid,
    }
  }
};

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
});

export default DragSource('person', spec, collect)(PersonCard);
