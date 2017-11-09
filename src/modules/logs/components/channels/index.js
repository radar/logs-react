import React from 'react';
import { gql, graphql, compose } from "react-apollo";

function Channels({ data: { loading, channels}}) {
  return (
    <div className="channels">
      Channels list goes here
    </div>
  );
}

export default graphql(gql`
  query ChannelsQuery {
    channels {
      name
    }
  }
`)(Channels);
