import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import {
  selectMobility,
  selectMobilityCountriesWithinFlag,
} from "../redux/reducers";
import Container from "./Container";
import CovList from "./CovList";
import ListContainer from "./ListContainer";
import Loader from "./Loader";
import MobilityDialog from "./MobilityDialog";
import Grid from "@material-ui/core/Grid";
import { AgChartsReact } from "ag-charts-react";
const useStyles = makeStyles(() => ({
  Mobility: {
    textAlign: "center",
  },
}));

const Mobility = () => {
  const classes = useStyles();
  const mobilityState = useSelector(selectMobility);
  const mobilityCountries = useSelector(selectMobilityCountriesWithinFlag);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [subregions, setSubregions] = useState([]);
  const [selected, setSelected] = useState({});
  const [chart, setChart] = useState({
    options: {
      autoSize: true,
      title: {
        text:
          "seleziona un paese e le sue città per analizzarne il trend di mobilità",
      },
      data: [],
      series: [],
    },
  });
  const fetchSubRegions = async (country) => {
    console.log({ country });
    const index = subregions.findIndex(
      (subregion) => subregion?.country == country
    ); // -1 not found; != -1 country already exists

    if (index !== -1) {
      return subregions[index];
    }

    const { data } = await axios.get(
      `https://disease.sh/v3/covid-19/apple/countries/${country}`
    );
    setSubregions((prevState) => {
      return [...prevState, data];
    });
    return data;
  };
  const retrieveSubregionsFromCountry = async (country) => {
    setOpen(true);
    setLoading(true);
    const data = await fetchSubRegions(country);
    setLoading(false);
    setSelected(data);
  };

  const resetSelected = () => {
    setOpen(false);
    setSelected({});
  };

  const handleSelectedSubregions = async (subregionsString) => {
    setOpen(false);
    const { data } = await axios.get(
      `https://disease.sh/v3/covid-19/apple/countries/${selected.country}/${subregionsString}`
    );
    console.log({ dati: { data } });
    let dataChart;
    console.log(subregionsString.split(","));
    console.log(subregionsString.split(",").length);
    if (subregionsString.split(",").length == 1) {
      dataChart = data.data.map((subregionMobility) => {
        return {
          [subregionMobility.subregion_and_city]: subregionMobility.driving,
          date: subregionMobility.date,
        };
      });
    } else {
      dataChart = data
        .map((subregionsMobility) => {
          return subregionsMobility.data.map((subregionMobility) => {
            return {
              [subregionMobility.subregion_and_city]: subregionMobility.driving,
              date: subregionMobility.date,
            };
          });
        })
        .flat();
    }
    const seriesChart = subregionsString.split(",").map((subregion) => {
      return {
        xKey: "date",
        yKey: subregion,
        yName: subregion,
        xKeyName: " ",
      };
    });
    console.log({ dataChart });
    setChart({
      options: {
        title: {
          text: `trend di mobilità (automobile in %) dal 13 gennaio 2020 per ${selected.country}`,
        },
        data: dataChart,
        series: seriesChart,
        axes: [
          {
            type: "number",
            position: "left",
            title: {
              text: "",
              enabled: false,
            },
          },
          {
            type: "category",
            position: "bottom",
            label: {
              color: "#ffffff",
            },
          },
        ],
      },
    });
    console.log({ chart });
    setSelected({});
  };

  const renderData = () => {
    if (mobilityState.loading) {
      return <Loader open />;
    }
    return (
      <Container>
        <ListContainer>
          <CovList
            classType="primary"
            title="trend di mobilità legati al COVID-19"
            total={"Dal 13 gennaio"}
            titleColor="lightBlue"
            focus=""
            items={mobilityCountries}
            onSelectListItem={retrieveSubregionsFromCountry}
          />
        </ListContainer>
        <MobilityDialog
          open={open}
          handleSelected={handleSelectedSubregions}
          handleClose={resetSelected}
          loading={loading}
          data={selected}
        />
        <Grid item xs={12} sm={12} md={9} lg={9} xl={10}>
          <AgChartsReact options={chart.options} />
        </Grid>
      </Container>
    );
  };
  return <div className={classes.Mobility}>{renderData()}</div>;
};

export default Mobility;
