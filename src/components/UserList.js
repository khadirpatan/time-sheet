import React, { useState, useEffect } from "react";
import { Grid, Typography, Paper, TextField } from "@material-ui/core";
import Autocomplete, {
  createFilterOptions
} from "@material-ui/lab/Autocomplete";

import { makeStyles } from "@material-ui/core";
import dummyPic from "../images/dummyUser.png";

const useStyles = makeStyles(theme => ({
  cardsContainer: {
    padding: theme.spacing(1),
    marginTop: theme.spacing(1)
  },
  userCard: {
    cursor: "pointer",
    borderLeft: `2px solid ${theme.palette.primary.main}`,
    borderRadius: "2px",
    boxShadow: "2px 2px 10px 1px lightgrey",
    transition: "all 0.5s",
    padding: theme.spacing(2),
    scrollBehavior: "smooth",
    "&:hover": {
      transform: "scale(1.1)",
      cursor: "pointer",
      backgroundColor: "white"
    }
  },
  userImg: {
    border: "1px solid lightgrey"
  },
  profilePicGrid: {
    textAlign: "right"
  },
  searchUser: {
    padding: theme.spacing(1)
  }
}));

const UserList = props => {
  const classes = useStyles();
  const { userData, setSelectedUser } = props;
  let userOptions = [];
  const [searchUser, setSearchUser] = useState(null);

  // options for material-ui Auto Select
  if (userData) {
    for (let user of userData) {
      userOptions.push({
        label: user.real_name,
        value: user.id,
        location: user.tz
      });
    }
  }

  //whenever selecting user from drop down, getting that particular data and assigning to selectedUser so that Modal will open with that details
  useEffect(() => {
    if (searchUser) {
      setSelectedUser(userData.find(item => item.id === searchUser.value));
    }
  }, [searchUser, setSelectedUser, userData]);

  // filter options for Auto select , adding ID and Location also as searchable
  const filterOptions = createFilterOptions({
    stringify: option => option.label + option.value + option.location
  });

  return (
    <Grid container justify="center">
      <Grid item xs={12} md={9}>
        <Grid container className={classes.searchUser} justify="flex-end">
          <Grid item xs={12} md={3}>
            <Autocomplete
              style={{ width: "100%" }}
              options={userOptions}
              getOptionSelected={option => option.label}
              getOptionLabel={option => (option.label ? option.label : "")}
              filterOptions={filterOptions}
              renderOption={option => (
                <Grid container>
                  <Grid item xs={12}>
                    <Typography variant="body1">
                      {option.label && (
                        <>
                          {option.label} <br />{" "}
                        </>
                      )}
                    </Typography>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="caption" color="textSecondary">
                      {option.value && <>{option.value}</>}
                      {option.location && (
                        <>
                          , {option.location} <br />{" "}
                        </>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              )}
              onChange={(e, newVal) => setSearchUser(newVal)}
              renderInput={params => (
                <TextField
                  {...params}
                  label="Find a User"
                  inputProps={{
                    ...params.inputProps,
                    placeholder: "Find user by name , id , location",
                    autoComplete: "new-password" // disable autocomplete and autofill
                  }}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container className={classes.cardsContainer} spacing={2}>
          {userData.map((user, index) => (
            <Grid
              item
              xs={10}
              sm={6}
              md={4}
              lg={3}
              key={index}
              onClick={() => {
                setSelectedUser(user);
              }}
            >
              <Paper className={classes.userCard}>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography variant="body2" color="textSecondary">
                      User name
                    </Typography>
                    <Typography noWrap gutterBottom>
                      {user.real_name}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      User id
                    </Typography>
                    <Typography noWrap gutterBottom>
                      {user.id}
                    </Typography>

                    <Typography variant="body2" color="textSecondary">
                      Location
                    </Typography>
                    <Typography noWrap gutterBottom>
                      {user.tz}
                    </Typography>
                  </Grid>
                  <Grid item xs={4} className={classes.profilePicGrid}>
                    <img
                      src={dummyPic}
                      className={classes.userImg}
                      alt="userPic"
                      height="60"
                    ></img>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserList;
