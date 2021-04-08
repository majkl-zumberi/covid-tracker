import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import "./App.css";
import Coverage from "./components/Coverage";
import Home from "./components/Home/Home";
import Nav from "./components/Nav";
import Mobility from "./components/Mobility";
import {
  fetchCovTotals,
  fetchGlobalCov,
  fetchCoverage,
  fetchGlobalCoverage,
  fetchMobility,
} from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCovTotals());
    dispatch(fetchGlobalCov());
    dispatch(fetchGlobalCoverage());
    dispatch(fetchCoverage());
    dispatch(fetchMobility());
  }, []);
  return (
    <Router>
      <Nav />
      <Switch>
        <Route exact path="/coverage">
          <Coverage />
        </Route>
        <Route exact path="/mobility">
          <Mobility />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Redirect from="*" to="/" />
      </Switch>
    </Router>
  );
}

export default App;
