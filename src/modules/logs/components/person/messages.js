import React from 'react';
import moment from 'moment';

import Messages from 'modules/logs/components/messages';

const GroupedMessages = ({messages, nick, date}) => {
  return (
    <div>
      <h3>{date}</h3>

      <Messages messages={messages} nick={nick} />
    </div>
  )
}

class PersonMessages extends React.Component {
  state = {
    page: this.props.page
  }

  renderGroups = (groups, nick) => {
    return Object.keys(groups).map((date) => {
      return <GroupedMessages
        date={date}
        messages={groups[date]}
        nick={nick}
        key={date}
      />
    })
  }

  render () {
    let {messages, showJoinsParts, nick} = this.props;

    if (!showJoinsParts) {
      messages = messages.filter(message => (message.type === "message"))
    }

    let messageGroups = messages.reduce((groups, message) => {
      let date = moment(message.createdAt).format("Y-MM-DD");
      groups[date] = groups[date] || []
      groups[date].push(message)
      return groups;
    }, {})

    return (
      <div>
        {this.renderGroups(messageGroups, nick)}
      </div>
    )
  }
}

export default PersonMessages;
