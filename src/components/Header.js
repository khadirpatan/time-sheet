import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";

import PeopleIcon from "@material-ui/icons/People";

const useStyles = makeStyles(theme => ({
  header: {
    backgroundColor: theme.palette.secondary.main,
    padding: "10px",
    color: "white",
    textAlign: "center"
  },
  personIcon: {
    position: "relative",
    top: "8px",
    fontSize: "2rem"
    // color: "white"
  }
}));

const Header = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.header} justify="center">
      {" "}
      <Grid item xs={12}>
        <Typography variant="h6">
          {" "}
          <PeopleIcon className={classes.personIcon} color="error" /> User Time
          Sheet
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Header;
