import React from "react";
import { Switch, Route } from "react-router-dom";
import Form from "./Form";
import Home from "./Home";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/pizza">
          <Form />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}
