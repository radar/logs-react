import React from 'react';
import {channelWithData } from './container';
import { compose } from 'react-apollo';
import Messages from './messages';
import Loading from 'loading';

class Channel extends React.Component {
  state = {
    showJoinsParts: false
  }

  toggleJoinsParts = () => {
    this.setState({showJoinsParts: !this.state.showJoinsParts})
  }

  render () {
    const {data: {loading, channel}, match} = this.props;

    if (loading) return <Loading />;

    return (
      <div>
        <h2>{channel.name} - DATE GOES HERE</h2>

      <p>
        <label htmlFor='show_events'>
          <input type='checkbox' onClick={this.toggleJoinsParts} /> Show joins + parts
        </label>
      </p>

        <Messages match={match} showJoinsParts={this.state.showJoinsParts}></Messages>
      </div>
    )
  }
};

export default compose(channelWithData)(Channel);
