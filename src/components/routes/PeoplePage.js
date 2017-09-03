import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addPerson } from '../../ducks/people';
import NewPersonForm from '../people/NewPersonForm';

class PeoplePage extends Component {

  render() {
    return (
      <div>
        <h1>People Page</h1>
        <NewPersonForm onSubmit={this.props.addPerson} />
      </div>
    );
  }
}

PeoplePage.propTypes = {};
PeoplePage.defaultProps = {};

export default connect(null, { addPerson })(PeoplePage);
