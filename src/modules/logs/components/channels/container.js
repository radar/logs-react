import { gql, graphql, compose } from "react-apollo";

const allChannels = gql`
  query ChannelsQuery {
    channels {
      name
    }
  }
`;


export default compose(graphql(allChannels));
