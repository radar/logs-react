import React, { Component } from 'react';
import container from './container';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import Loading from 'loading';
import moment from 'moment';

class ChannelsItem extends Component {
  render() {
    return (
      <li><Link to={`/channels/${this.props.name}/${this.props.date}`}>#{this.props.name}</Link></li>
    )
  }
}

function Channels({ data: { loading, channels}}) {
  if (loading) return <Loading />;

  let date = moment().utc().format("Y-MM-DD");

  return (
    <ul className="channels">
      {channels.map(channel => (
        <ChannelsItem {...channel} key={channel.name} date={date}></ChannelsItem>
      ))}
    </ul>
  );
}

export default compose(container)(Channels);
