import React, { useState, useEffect } from "react";
import UserList from "../components/UserList";
import UserTimeSheet from "../components/UserTimeSheet";
import CloseIcon from "@material-ui/icons/Close";
import {
  makeStyles,
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  container: {
    minHeight: "90vh"
  },
  dialogPaper: {
    [theme.breakpoints.down("sm")]: {
      width: "100vh",
      margin: "0px"
    }
  },
  divInDialog: {
    // width: "100%",
    padding: theme.spacing(1),
    minHeight: "300px"
  },
  closeIcon: {
    position: "absolute",
    right: "15px",
    top: "15px",
    cursor: "pointer",
    "&:hover": {
      color: theme.palette.primary.main
    }
  }
}));

const UserListContainer = () => {
  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  // fetching data from mock server
  useEffect(() => {
    fetch("https://run.mocky.io/v3/b01f14e7-02dd-4696-8a5b-2d72fc6de234")
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUserData(data);
      })
      .catch(err => {
        setError("Error white getting data");
      });
  }, []);

  return (
    <>
      {!error && userData ? (
        <>
          <div className={classes.container}>
            <UserList
              userData={userData.members}
              setSelectedUser={setSelectedUser}
            />
          </div>
          {selectedUser && (
            <Dialog
              disableBackdropClick
              open={Boolean(selectedUser)}
              fullWidth
              maxWidth="sm"
              classes={{ paper: classes.dialogPaper }}
              onClose={() => setSelectedUser(null)}
            >
              <DialogTitle>
                <Typography noWrap color="primary">
                  <strong>{selectedUser.real_name}'s</strong> Time Sheet
                </Typography>
                <CloseIcon
                  className={classes.closeIcon}
                  onClick={() => {
                    setSelectedUser(null);
                  }}
                />
              </DialogTitle>
              <div className={classes.divInDialog}>
                <UserTimeSheet user={selectedUser} />
              </div>

              <DialogActions>
                <Button
                  onClick={() => {
                    setSelectedUser(null);
                  }}
                  variant="outlined"
                  color="primary"
                >
                  Close
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </>
      ) : (
        <>
          {error ? (
            <Typography>{error}</Typography>
          ) : (
            <Typography>Fetching Data.....</Typography>
          )}
        </>
      )}
    </>
  );
};

export default UserListContainer;
