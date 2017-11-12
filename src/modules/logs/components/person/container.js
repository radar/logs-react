import {gql, graphql} from "react-apollo";

const personQuery = gql`
  query personQuery($nick: String!, $cursor: String!) {
    person(nick: $nick) {
      nick
      messages(first: 250, after: $cursor) {
        edges {
          cursor
          node {
            id
            text
            type
            createdAt
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const personWithData = (graphql(personQuery, {
  options: (props) => ({
    variables: {
      nick: props.match.params.nick,
    },
  }),
  props: (props) => {
    return {
      data: props.data,
      loadOlderMessages: () => {
        return props.data.fetchMore({
          variables: {
            nick: props.data.person.nick,
            cursor: props.data.person.messages.pageInfo.endCursor,
          },
          updateQuery(previousResult, { fetchMoreResult }) {
            const prevMessages =
              previousResult.person.messages;
            const newMessages =
              fetchMoreResult.person.messages;
            const newPersonData = {...previousResult.person,
              messages: {
                edges: [
                  ...prevMessages.edges,
                  ...newMessages.edges,
                ],
                pageInfo: newMessages.pageInfo,
              }
            }
            const newData = {
              ...previousResult,
              person: newPersonData
            };
            console.log(newData)
            return newData;
          }
        });
      }
    };
  }
}));
