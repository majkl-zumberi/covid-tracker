import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoverage, fetchGlobalCoverage } from "../redux/actions";
import {
  selectCoverage,
  selectGlobalCoverage,
  selectTotalCoverageGroupedByCountries,
  selectTotalGlobalCoverage,
} from "../redux/reducers";
import Container from "./Container";
import CovList from "./CovList";
import ListContainer from "./ListContainer";
import Loader from "./Loader";
const useStyles = makeStyles(() => ({
  Coverage: {
    textAlign: "center",
  },
}));
const Coverage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const globalCoverage = useSelector(selectGlobalCoverage);
  const coverage = useSelector(selectCoverage);
  const coverageGroupedByCountries = useSelector(
    selectTotalCoverageGroupedByCountries
  );
  const totalGlobalCoverage = useSelector(selectTotalGlobalCoverage);
  console.log(totalGlobalCoverage);
  useEffect(() => {
    dispatch(fetchGlobalCoverage());
    dispatch(fetchCoverage());
  }, []);

  const renderData = () => {
    if (globalCoverage.loading || coverage.loading) {
      return <Loader open={true} />;
    }
    return (
      <Container>
        <ListContainer>
          <CovList
            classType="primary"
            title="Totale Dosi somministrate"
            total={totalGlobalCoverage}
            titleColor="lightGreen"
            focus="totalCountryCoverage"
            items={
              Array.isArray(coverageGroupedByCountries)
                ? coverageGroupedByCountries
                : []
            }
          />
        </ListContainer>
      </Container>
    );
  };

  return <div className={classes.Coverage}>{renderData()}</div>;
};

export default Coverage;
