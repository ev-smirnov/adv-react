import React, { Component } from 'react';
import { connect } from 'react-redux';
import { moduleName, fetchAll, selectEvent, eventListSelector } from '../../ducks/events';
import Loader from '../common/Loader';

export class EventListTable extends Component {
  componentDidMount() {
    this.props.fetchAll();
  }

  handleRowClick = (uid) => () => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(uid);
  };

  getRows = () => (
    this.props.events.map(this.getRow)
  );

  getRow = (event) => (
    <tr
      key={event.uid}
      onClick={this.handleRowClick(event.uid)}
    >
      <td>{event.title}</td>
      <td>{event.where}</td>
      <td>{event.month}</td>
    </tr>
  );

  render() {
    if (this.props.loading) {
      return <Loader />;
    }
    return (
      <div>
        <table>
          <tbody>
            {this.getRows()}
          </tbody>
        </table>
      </div>
    );
  }
}

EventListTable.propTypes = {};
EventListTable.defaultProps = {};

export default connect(state => ({
  events: eventListSelector(state),
  loading: state[moduleName].loading,
}), { fetchAll, selectEvent })(EventListTable);
