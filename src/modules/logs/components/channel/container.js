import { gql, graphql } from "react-apollo";

const channel = gql`
  query channelQuery($name: String!) {
    channel(name: $name) {
      name
    }
  }
`;

const messages = gql`
  query messagesQuery($name: String!, $date: String!) {
    messages(name: $name, date: $date) {
      id
      text
      type
      createdAt
      person {
        nick
      }
    }
  }
`;

export const channelWithData = graphql(channel, {
  options: ({match}) => ({ variables: { name: match.params.name } }),
});

export const messagesWithData = graphql(messages, {
  options: ({name, date}) => ({ variables: { name: name, date: date } }),
});
