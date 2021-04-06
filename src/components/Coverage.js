import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  selectCoverage,
  selectCoverageChart,
  selectGlobalCoverage,
  selectTotalCoverageGroupedByCountries,
  selectTotalGlobalCoverage,
} from "../redux/reducers";
import Container from "./Container";
import CovList from "./CovList";
import ListContainer from "./ListContainer";
import Loader from "./Loader";
import Grid from "@material-ui/core/Grid";
import { AgChartsReact } from "ag-charts-react";

const useStyles = makeStyles(() => ({
  Coverage: {
    textAlign: "center",
  },
}));
const Coverage = () => {
  const classes = useStyles();

  const globalCoverage = useSelector(selectGlobalCoverage);
  const coverage = useSelector(selectCoverage);
  const coverageGroupedByCountries = useSelector(
    selectTotalCoverageGroupedByCountries
  );
  const totalGlobalCoverage = useSelector(selectTotalGlobalCoverage);
  const rowsChart = useSelector(selectCoverageChart);
  console.log({ rowsChart });
  const [chart, setChart] = useState({
    options: {
      autoSize: true,
      title: { text: "" },
      data: [],
      series: [],
    },
  });

  useEffect(() => {
    // set initial state for chart, it will display by default the first two countries
    setChart({
      options: {
        autoSize: true,
        title: {
          text: "totale dosi dei vaccini somministrati negli ultimi 15 giorni",
        },
        data: [
          ...(rowsChart[0]?.timeline ?? []),
          ...(rowsChart[1]?.timeline ?? []),
        ],
        series: [
          {
            xKey: "date",
            yKey: rowsChart[0]?.country ?? "",
            yName: rowsChart[0]?.country ?? "",
          },
          {
            xKey: "date",
            yKey: rowsChart[1]?.country ?? "",
            yName: rowsChart[1]?.country ?? "",
          },
        ],
      },
    });
  }, [rowsChart]);

  // function fowarded to child as a prop for CovList
  const handleClickListItem = (country) => {
    //check if country already exists in chart
    const status = chart.options.data.some((row) =>
      Object.keys(row).some((key) => key === country)
    )
      ? "remove"
      : "add";

    if (status === "add") {
      const countryToAdd = rowsChart.find((row) => row.country === country);
      setChart((prevState) => {
        return {
          ...prevState,
          options: {
            ...prevState.options,
            data: [...prevState.options.data, ...countryToAdd?.timeline],
            series: [
              ...prevState.options.series,
              {
                xKey: "date",
                yKey: countryToAdd.country,
                yName: countryToAdd.country,
              },
            ],
          },
        };
      });
    } else if (status === "remove") {
      setChart((prevState) => {
        const filteredData = prevState.options.data.filter(
          (row) => !Object.keys(row).includes(country)
        );
        const filteredSeries = prevState.options.series.filter(
          (serie) => serie.yKey !== country
        );
        return {
          ...prevState,
          options: {
            ...prevState.options,
            data: [...filteredData],
            series: [...filteredSeries],
          },
        };
      });
    }
  };

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
            total={totalGlobalCoverage.toLocaleString()}
            titleColor="lightGreen"
            focus="totalCountryCoverage"
            items={coverageGroupedByCountries}
            onSelectListItem={handleClickListItem}
          />
        </ListContainer>
        <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
          <AgChartsReact options={chart.options} />
        </Grid>
      </Container>
    );
  };

  return <div className={classes.Coverage}>{renderData()}</div>;
};

export default Coverage;
