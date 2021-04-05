import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import CovList from "../CovList";
import CovMap from "../CovMap";
import "./index.css";
import ListContainer from "../ListContainer";
import Loader from "../Loader";

import {
  selectCountriesSortedByCases,
  selectCountriesSortedByDeaths,
  selectCovGlobal,
  selectCovTotals,
} from "../../redux/reducers";

function Home() {
  const covGlobal = useSelector(selectCovGlobal);
  const covTotals = useSelector(selectCovTotals);
  const countriesSortedByDeaths = useSelector(selectCountriesSortedByDeaths);
  const countriesSortedByCases = useSelector(selectCountriesSortedByCases);

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
  return <div className="Home">{renderData()}</div>;
}

export default Home;
