import { gql, graphql } from "react-apollo";

const channel = gql`
  query channelQuery($name: String!, $date: String!) {
    channel(name: $name) {
      name
      messages(date: $date) {
        id
        text
        type
        createdAt
        person {
          nick
        }
      }
    }
  }
`;

export const channelWithData = graphql(channel, {
  options: ({match: {params: {name, date}}}) => ({ variables: { name: name, date: date } }),
});
