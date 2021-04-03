import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";
function Container(props) {
  return (
    <Grid
      container
      style={{ padding: "1em 1em 0 1em", backgroundColor: "#424242" }}
    >
      {props.children}
    </Grid>
  );
}
Container.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Container;
