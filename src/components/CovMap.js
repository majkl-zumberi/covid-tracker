import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { CircleMarker, MapContainer, TileLayer, Tooltip } from "react-leaflet";
const useStyles = makeStyles((theme) => ({
  map: {
    [theme.breakpoints.down("xl")]: {
      height: "90vh",
      backgroundColor: "transparent",
    },
    [theme.breakpoints.down("lg")]: {
      height: "83vh",
      backgroundColor: "transparent",
    },
  },
}));
const renderMarkers = (data) => {
  return data.map((country) => {
    return (
      <CircleMarker
        center={[country.countryInfo.lat, country.countryInfo.long]}
        key={country.countryInfo._id ?? country.country}
        radius={10}
        pathOptions={{ color: "red" }}
      >
        <Tooltip>
          <ListItem>
            <ListItemAvatar>
              <Avatar
                variant="rounded"
                alt={country.country}
                src={country.countryInfo.flag}
              />
            </ListItemAvatar>
            <ListItemText primary={country.country} />

            <Box>
              <p>Infetti oggi: {country.todayCases.toLocaleString()}</p>
              <p>Decessi oggi: {country.todayDeaths.toLocaleString()}</p>
            </Box>
          </ListItem>
        </Tooltip>
      </CircleMarker>
    );
  });
};
function CovMap({ countries }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={12} md={6} lg={6} xl={8}>
      <MapContainer
        center={[41.871941, 12.56738]}
        zoom={5}
        scrollWheelZoom={true}
        className={classes.map}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {renderMarkers(countries)}
      </MapContainer>
    </Grid>
  );
}
CovMap.propTypes = {
  countries: PropTypes.array.isRequired,
};

export default CovMap;
