import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import Container from "./components/Container";
import CovList from "./components/CovList";
import CovMap from "./components/CovMap";
import ListContainer from "./components/ListContainer";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import { fetchCovTotals, fetchGlobalCov } from "./redux/actions";
function App() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  console.log({ state });

  useEffect(() => {
    dispatch(fetchCovTotals());
    dispatch(fetchGlobalCov());
  }, []);
  const renderData = () => {
    if (state.covGlobal.loading || state.covTotals.loading) {
      return <Loader open={true} />;
    } else {
      return (
        <Container>
          <ListContainer>
            <CovList
              title="Totale decessi"
              titleColor="error.main"
              total={
                state.covGlobal.detail.deaths &&
                state.covGlobal.detail.deaths.toLocaleString()
              }
              items={state.covTotals.countries}
              focus="deaths"
            />
          </ListContainer>
          <CovMap />
          <ListContainer>
            <CovList
              title="Totale Infetti"
              titleColor="secondary.main"
              total={
                state.covGlobal.detail.deaths &&
                state.covGlobal.detail.cases.toLocaleString()
              }
              items={state.covTotals.countries}
              focus="cases"
            />
          </ListContainer>
        </Container>
      );
    }
  };
  return (
    <div className="App">
      <Nav />
      {renderData()}
    </div>
  );
}

export default App;
