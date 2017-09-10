import React, { Component } from 'react';
import { Table, Column } from 'react-virtualized';
import Loader from '../common/Loader';

class PersonList extends Component {
  componentDidMount() {
    this.props.fetchAll && this.props.fetchAll();
  }

  rowGetter = ({ index }) => this.props.people[index];

  render() {
    const { people, loading } = this.props;

    if (loading) {
      return <Loader />;
    }

    return (
      <Table
        rowCount={people.length}
        rowGetter={this.rowGetter}
        rowHeight={40}
        headerHeight={50}
        width={600}
        height={300}
        rowClassName="test--people-list__row"
      >
        <Column
          label="First Name"
          dataKey="firstName"
          width={200}
        />
        <Column
          label="Last Name"
          dataKey="lastName"
          width={200}
        />
        <Column
          label="Email"
          dataKey="email"
          width={200}
        />
      </Table>
    );
  }
}

PersonList.propTypes = {};
PersonList.defaultProps = {};

export default PersonList;
