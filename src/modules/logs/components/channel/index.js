import React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

import Messages from 'modules/logs/components/messages';
import {channelWithData } from './container';
import Loading from 'loading';

class Channel extends React.Component {
  state = {
    showJoinsParts: false
  }

  toggleJoinsParts = () => {
    this.setState({showJoinsParts: !this.state.showJoinsParts})
  }

  render () {
    const {data: {loading, channel}, match: { params: {date: paramDate}}} = this.props;

    if (loading) return <Loading />;

    const messages = channel.messages;

    let date;
    if (paramDate) {
      date = moment(paramDate)
    } else {
      date = moment().utc()
    }

    const yesterday = date.clone().subtract(1, 'day').format("Y-MM-DD");
    const tomorrow = date.clone().add(1, 'day').format("Y-MM-DD");
    const formattedDate = date.format("Y-MM-DD");

    return (
      <div>
        <h2>{channel.name} - {formattedDate}</h2>

        <Link to={{
          pathname: `/channels/${channel.name}/${yesterday}`,
          }}>Back one day
        </Link>
        &nbsp;
        <Link to={{
          pathname: `/channels/${channel.name}/${tomorrow}`,
          }}>Forward one day
        </Link>

        <p>
          <label htmlFor='show_events'>
            <input type='checkbox' id='show_events' onClick={this.toggleJoinsParts} /> Show joins + parts
          </label>
        </p>

        <Messages
          name={channel.name}
          messages={messages}
          showJoinsParts={this.state.showJoinsParts} />
      </div>
    )
  }
};

export default compose(channelWithData)(Channel);
