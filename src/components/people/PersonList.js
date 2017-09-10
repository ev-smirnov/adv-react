import React, { Component } from 'react';
import { connect } from 'react-redux';
import { List } from 'react-virtualized';
import { personListSelector, fetchAll } from '../../ducks/people';
import PersonCard from './PersonCard';

class PersonList extends Component {
  componentDidMount() {
    this.props.fetchAll && this.props.fetchAll();
  }

  rowRenderer = ({ index, key, style }) => (
    <PersonCard person = {this.props.people[index]} key = {key} style = {style}/>
  );

  render() {
    return (
      <List
        rowCount={this.props.people.length}
        rowHeight={100}
        height={300}
        width={200}
        rowRenderer={this.rowRenderer}
      />
    );
  }
}

PersonList.propTypes = {};
PersonList.defaultProps = {};

export default connect(state => ({
  people: personListSelector(state),
}), { fetchAll })(PersonList);
