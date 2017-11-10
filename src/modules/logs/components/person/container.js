import {gql, graphql} from "react-apollo";

const person = gql`
  query personQuery($nick: String!) {
    person(nick: $nick) {
      nick
    }
  }
`;

const messages = gql`
  query personMessagesQuery($nick: String!) {
    personMessages(nick: $nick) {
      id
      text
      type
      createdAt
    }
  }
`;


export const personWithData = graphql(person, {
  options: ({match}) => ({ variables: { nick: match.params.nick } }),
});

export const messagesWithData = graphql(messages, {
  options: ({nick}) => ({ variables: { nick: nick } }),
});
