import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Table, Column, InfiniteLoader } from 'react-virtualized';
import { moduleName, fetchLazy, selectEvent, eventListSelector } from '../../ducks/events';
import 'react-virtualized/styles.css'

export class EventListVirtualized extends Component {
  componentDidMount() {
    this.props.fetchLazy();
  }

  handleRowClick = ({ rowData }) => {
    const { selectEvent } = this.props;
    selectEvent && selectEvent(rowData.uid);
  };

  rowGetter = ({ index }) => this.props.events[index];

  isRowLoaded = ({ index }) => index < this.props.events.length;

  loadMoreRows = () => {
    this.props.fetchLazy();
  };

  render() {
    const { loaded, events } = this.props;
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        rowCount={loaded ? events.length : events.length + 1}
        loadMoreRows={this.loadMoreRows}
      >
        {({ onRowsRendered, registerChild }) =>
          <Table
            ref={registerChild}
            rowCount={events.length}
            rowGetter={this.rowGetter}
            rowHeight={40}
            headerHeight={50}
            width={700}
            height={300}
            overscanRowCount={5}
            onRowClick={this.handleRowClick}
            onRowsRendered={onRowsRendered}
          >
            <Column
              label="title"
              dataKey="title"
              width={300}
            />
            <Column
              label="where"
              dataKey="where"
              width={250}
            />
            <Column
              label="when"
              dataKey="month"
              width={150}
            />
          </Table>
        }
      </InfiniteLoader>
    );
  }
}

EventListVirtualized.propTypes = {};
EventListVirtualized.defaultProps = {};

export default connect(state => ({
  events: eventListSelector(state),
  loaded: state[moduleName].loaded,
}), { fetchLazy, selectEvent })(EventListVirtualized);
