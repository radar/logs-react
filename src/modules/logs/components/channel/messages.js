import React from 'react';
import { compose } from 'react-apollo';

import { messagesWithData } from './container';
import Messages from 'modules/logs/components/messages';
import Loading from 'loading';

const ChannelMessages = ({data: {loading, error, messages}, showJoinsParts}) => {
  if (loading) return <Loading />;

  if (!showJoinsParts) {
    messages = messages.filter(message => (message.type === "message"))
  }

  return (
    <Messages messages={messages} showJoinsParts={showJoinsParts} />
  )
}

export default compose(messagesWithData)(ChannelMessages);
