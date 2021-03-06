import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import Grid from "@material-ui/core/Grid";

const style = {
  grid: {
    padding: "0 15px"
  }
};

function GridItem({ ...props }) {
  const { classes, children, ...rest } = props;
  return (
    <Grid item {...rest} className={classes.grid}>
      {children}
    </Grid>
  );
}

GridItem.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.node
};

export default withStyles(style)(GridItem);
