import React from "react";
import { makeStyles, Typography, Grid } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  footer: {
    backgroundColor: theme.palette.secondary.main,
    padding: "10px",
    color: "white",
    textAlign: "center"
  }
}));

const Footer = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.footer} justify="center">
      {" "}
      <Grid item xs={12}>
        <Typography variant="body2"> Copyright @ 2020 Khadir Patan</Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;
