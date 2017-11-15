import React from "react";
import { Route, Switch } from "react-router-dom";
import Channels from "modules/logs/components/channels";
import Channel from "modules/logs/components/channel";
import Person from "modules/logs/components/person";
import PersonActivity from "modules/logs/components/person/activity";

export function App() {
  return (
    <div className="container">
      <Switch>
        <Route exact path="/" component={Channels} />
        <Route exact path="/channels" component={Channels} />
        <Route path="/channels/:name/:date" component={Channel} />
        <Route path="/p/:nick/activity" component={PersonActivity} />
        <Route path="/p/:nick" component={Person} />
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
