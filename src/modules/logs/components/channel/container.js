import { gql, graphql } from "react-apollo";

const channel = gql`
  query channelQuery($name: String!) {
    channel(name: $name) {
      name
    }
  }
`;

const messages = gql`
  query messagesQuery($name: String!) {
    messages(name: $name) {
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
  options: ({match}) => ({ variables: { name: match.params.name } }),
});
