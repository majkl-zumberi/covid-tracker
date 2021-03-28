import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import React from "react";
function ListContainer(props) {
  return (
    <Grid item xs={12} sm={2}>
      {props.children}
    </Grid>
  );
}
ListContainer.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ListContainer;
