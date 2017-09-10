import React, { Component } from 'react';
import { connect } from 'react-redux';
import { personListSelector, loadingSelector, addPerson, fetchAll } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';
import PersonTable from '../people/PersonTable';

class PeoplePage extends Component {

  render() {
    const { people, peopleLoading, addPerson, fetchAll } = this.props;

    return (
      <div>
        <h1>People Page</h1>
        <h2>Add new person</h2>
        <NewPersonForm onSubmit={addPerson} />
        <h2>Person List</h2>
        <PersonTable people={people} fetchAll={fetchAll} loading={peopleLoading} />
      </div>
    );
  }
}

PeoplePage.propTypes = {};
PeoplePage.defaultProps = {};

export default connect(state => ({
  people: personListSelector(state),
  peopleLoading: loadingSelector(state),
}), { addPerson, fetchAll })(PeoplePage);
