import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import HeaderLinks from "./HeaderLinks";
import Button from "../CustomButtons/Button";

import headerStyle from "../../assets/jss/material-dashboard-react/components/headerStyle.jsx";

function Header({ ...props }) {
  function makeBrand() {
    let name;
    let linkHeader;
    props.routes.map(prop => {
      if (prop.path === props.location.pathname) {
        name = prop.navbarName;
        linkHeader = "#"
      }
      else {
        if (props.location.pathname.includes("/news/")) {
          name = "Tin tức/"
          linkHeader = "/news"
        }
      }
      return null;
    });
    return {
      name: name,
      linkHeader: linkHeader
    };
  }
  const { classes, color } = props;
  const appBarClasses = classNames({
    [" " + classes[color]]: color
  });
  return (
    <AppBar className={classes.appBar + appBarClasses}>
      <Toolbar className={classes.container}>
        <div className={classes.flex}>
          {/* Here we create navbar brand, based on route name */}
          <Button color="transparent" href={makeBrand().linkHeader} className={classes.title}>
            {makeBrand().name}
          </Button>
        </div>
        <Hidden smDown implementation="css">
          <HeaderLinks />
        </Hidden>
        <Hidden mdUp implementation="css">
          <IconButton
            className={classes.appResponsive}
            color="inherit"
            aria-label="open drawer"
            onClick={props.handleDrawerToggle}
          >
            <Menu />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
  routes: PropTypes.array
};

export default withStyles(headerStyle)(Header);
