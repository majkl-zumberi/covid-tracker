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
import {
  selectCovGlobal,
  selectCovTotals,
  selectCountriesSortedByCases,
  selectCountriesSortedByDeaths,
} from "./redux/reducers";
function App() {
  const dispatch = useDispatch();
  const covGlobal = useSelector(selectCovGlobal);
  const covTotals = useSelector(selectCovTotals);
  const countriesSortedByDeaths = useSelector(selectCountriesSortedByDeaths);
  const countriesSortedByCases = useSelector(selectCountriesSortedByCases);

  useEffect(() => {
    dispatch(fetchCovTotals());
    dispatch(fetchGlobalCov());
  }, []);
  const renderData = () => {
    if (covGlobal.loading || covTotals.loading) {
      return <Loader open={true} />;
    } else {
      return (
        <Container>
          <ListContainer>
            <CovList
              classType="primary"
              title="Totale decessi"
              titleColor="error.main"
              total={
                covGlobal.detail.deaths &&
                covGlobal.detail.deaths.toLocaleString()
              }
              items={countriesSortedByDeaths}
              focus="deaths"
            />
          </ListContainer>
          <CovMap countries={covTotals.countries} />
          <ListContainer>
            <CovList
              classType="secondary"
              title="Totale Contagi"
              titleColor="secondary.main"
              total={
                covGlobal.detail.deaths &&
                covGlobal.detail.cases.toLocaleString()
              }
              items={countriesSortedByCases}
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
