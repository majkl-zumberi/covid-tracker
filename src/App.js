import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Coverage from "./components/Coverage";
import Home from "./components/Home/Home";
import Nav from "./components/Nav";
import {
  fetchCovTotals,
  fetchGlobalCov,
  fetchCoverage,
  fetchGlobalCoverage,
} from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCovTotals());
    dispatch(fetchGlobalCov());
    dispatch(fetchGlobalCoverage());
    dispatch(fetchCoverage());
  }, []);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route path="/coverage">
          <Coverage />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
