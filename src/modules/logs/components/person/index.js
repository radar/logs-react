import React from 'react';
import { compose } from 'react-apollo';

import Loading from 'loading';
import { personWithData } from './container';
import Messages from './messages';

class Person extends React.Component {
 state = {
    showJoinsParts: false
  }

  toggleJoinsParts = () => {
    this.setState({showJoinsParts: !this.state.showJoinsParts})
  }

  render () {
    const {data: {loading, person}} = this.props;

    if (loading) return <Loading />;

    return (
      <div>
        <h2>{person.nick}</h2>

        <Messages
          nick={person.nick}
          showJoinsParts={this.state.showJoinsParts} />
      </div>
    )
  }
}

export default compose(personWithData)(Person);
