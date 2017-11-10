import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'

const Message = ({message, nick: personNick}) => {
  let nick;
  if (personNick) {
    nick = personNick;
  } else {
    nick = message.person.nick;
  }

  if (message.type === 'message') {
    return <RegularMessage {...message} nick={nick} />
  }

  if (message.type === 'join') {
    return <JoinMessage {...message} nick={nick} />
  }

  if (message.type === 'part') {
    return <PartMessage {...message} nick={nick} />
  }

  return <RegularMessage {...message} nick={nick} />
}

const MessageTimestamp = ({id, createdAt}) => {
  return <Link to={`#${id}`}>[{moment(createdAt).format("HH:mm:ss")}]</Link>
}

const PersonLink = ({nick}) => {
  return <Link to={`/p/${nick}`}>{nick}</Link>
}

const RegularMessage = ({id, createdAt, nick, text}) => {
  return (
    <div className='message'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const JoinMessage = ({id, createdAt, nick, text}) => {
  return (
    <div className='message join'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const PartMessage = ({id, createdAt, nick, text}) => {
  return (
    <div className='message part'>
      <MessageTimestamp id={id} createdAt={createdAt} />&nbsp;
      <PersonLink nick={nick} />:&nbsp;
      {text}
    </div>
  )
}

const Messages = ({messages, showJoinsParts, nick}) => {
  if (!showJoinsParts) {
    messages = messages.filter(message => (message.type === "message"))
  }

  return (
    <div id='messages'>
      {messages.map(message => (<Message nick={nick} message={message} key={message.id} />))}
    </div>
  )
}

export default Messages;
