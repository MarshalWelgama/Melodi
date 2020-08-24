import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage";
import Main from "./components/Main";
import Song from "./components/Song";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/main" component={Main} />
          <Route path="/songs/:songId">
            {" "}
            <Song />{" "}
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
