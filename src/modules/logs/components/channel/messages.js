import React from 'react';
import { compose } from 'react-apollo';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { messagesWithData } from './container';
import Loading from 'loading';

const Message = (message) => {
  if (message.type === 'message') {
    return <RegularMessage {...message} />
  }

  if (message.type === 'join') {
    return <JoinMessage {...message} />
  }

  if (message.type === 'part') {
    return <PartMessage {...message} />
  }

  return <RegularMessage {...message} />
}

const MessageTimestamp = ({id, createdAt}) => {
  return <Link to={`#${id}`}>[{moment(createdAt).format("HH:mm:ss")}]</Link>
}

const PersonLink = ({nick}) => {
  return <Link to={`/p/${nick}`}>{nick}</Link>
}

const RegularMessage = ({id, createdAt, person: { nick }, text}) => {
  return (
    <div className='message'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const JoinMessage = ({id, createdAt, person: { nick }, text}) => {
  return (
    <div className='message join'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const PartMessage = ({id, createdAt, person: { nick }, text}) => {
  return (
    <div className='message part'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const Messages = ({data: {loading, error, messages}, name, showJoinsParts}) => {
  if (loading) return <Loading />;

  if (!showJoinsParts) {
    messages = messages.filter(message => (message.type === "message"))
  }

  return (
    <div id='messages'>
      {messages.map(message => (<Message {...message} key={message.id}></Message>))}
    </div>
  )
}

export default compose(messagesWithData)(Messages);
