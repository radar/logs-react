import React from 'react';
import { compose } from 'react-apollo';

import { messagesWithData } from './container';
import Messages from 'modules/logs/components/messages';
import Loading from 'loading';

const PersonMessages = ({data: {loading, error, personMessages: messages}, showJoinsParts, nick}) => {
  if (loading) return <Loading />;

  if (!showJoinsParts) {
    messages = messages.filter(message => (message.type === "message"))
  }

  return (
    <Messages messages={messages} nick={nick} />
  )
}

export default compose(messagesWithData)(PersonMessages);
