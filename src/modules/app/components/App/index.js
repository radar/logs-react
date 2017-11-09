import React from "react";
import { Route, Switch } from "react-router-dom";
import Channels from "modules/logs/components/channels";

export function App() {
  return (
    <div className="app">
      <Switch>
        <Route exact path="/" component={Channels} />
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
