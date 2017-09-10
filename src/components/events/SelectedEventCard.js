import React, { Component } from 'react';
import PropTypes from 'prop-types';

class SelectedEventCard extends Component {
  render() {
    const { title, when, where } = this.props.event;
    return (
      <div>
        <h3>{title}</h3>
        <p>{when}, {where}</p>
      </div>
    );
  }
}

SelectedEventCard.propTypes = {};
SelectedEventCard.defaultProps = {};

export default SelectedEventCard;
