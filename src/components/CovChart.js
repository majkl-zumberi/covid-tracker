import React from "react";
import Grid from "@material-ui/core/Grid";
import Backdrop from "@material-ui/core/Backdrop";
import { makeStyles } from "@material-ui/core/styles";
import { AgChartsReact } from "ag-charts-react";
import CircularProgress from "@material-ui/core/CircularProgress";
import PropTypes from "prop-types";
const useStyles = makeStyles((theme) => ({
  backdrop: {
    position: "absolute",
    zIndex: theme.zIndex.drawer - 1,
    opacity: 0.5,
  },
  gridCointainer: {
    position: "relative",
    [theme.breakpoints.down("sm")]: {
      height: "88vh",
      backgroundColor: "transparent",
    },
  },
}));
const CovChart = ({ chart, chartLoading }) => {
  const classes = useStyles();
  return (
    <Grid
      item
      xs={12}
      sm={12}
      md={9}
      lg={9}
      xl={10}
      className={classes.gridCointainer}
    >
      <AgChartsReact options={chart.options} />
      <Backdrop className={classes.backdrop} open={chartLoading}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </Grid>
  );
};
CovChart.propTypes = {
  chartLoading: PropTypes.bool.isRequired,
  chart: PropTypes.object.isRequired,
};
export default CovChart;
