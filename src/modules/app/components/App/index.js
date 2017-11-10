import React from "react";
import { Route, Switch } from "react-router-dom";
import Channels from "modules/logs/components/channels";
import Channel from "modules/logs/components/channel";

export function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Channels} />
        <Route path="/channels/:name/:date" component={Channel} />
        <Route path="/channels/:name" component={Channel} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function NotFound() {
  return (
    <h5 style={{ margin: 40 }}>
      Route not found
    </h5>
  );
}
