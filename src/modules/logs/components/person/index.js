import React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';

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

  renderLoadOlderMessages() {
    const hasNextPage = this.props.data.person.messages.pageInfo.hasNextPage;

    if (hasNextPage) {
      return <a onClick={this.props.loadOlderMessages}>Load older messages...</a>
    } else {
      return (
        <div>
          <hr />
          End of messages
        </div>
      )
    }
  }

  render () {
    const {data: {loading}} = this.props;

    if (loading) return <Loading />;

    const {
      data: {
        person: {
          messages: { edges }
        }
      },
      match: {
        params: { nick }
      }
    } = this.props;

    const messages = edges.map(edge => (edge.node))

    return (
      <div>
        <h2>{nick}</h2>

        <Link to={`/p/${nick}/activity`}>Activity Graph</Link>

        <Messages
          messages={messages}
          nick={nick}
          page={1}
          showJoinsParts={this.state.showJoinsParts} />

        {this.renderLoadOlderMessages()}
      </div>
    )
  }
}

export default compose(personWithData)(Person);
