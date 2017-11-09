import React from 'react';
import { compose } from 'react-apollo';
import { messagesWithData } from './container';
import { Link } from 'react-router-dom';
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

const RegularMessage = ({id, createdAt, person: { nick }, text}) => {
  return (
    <div className='message'>
      <Link to={`#${id}`}>[{createdAt}]</Link> <Link to={`/p/${nick}`}>{nick}</Link>: {text}</div>
  )
}

const JoinMessage = (message) => {
  return (
    <div className='message join'>{message.person.nick} {message.text}</div>
  )
}

const PartMessage = (message) => {
  return (
    <div className='message part'>{message.person.nick} {message.text}</div>
  )
}

const Messages = ({data: {loading, error, messages}, match, showJoinsParts}) => {
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
