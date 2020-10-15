import React, { useState, useEffect } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  InputAdornment
} from "@material-ui/core";
import { DateTime } from "luxon";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import LuxonUtils from "@date-io/luxon";
import TodayIcon from "@material-ui/icons/Today";

const useStyles = makeStyles(theme => ({
  container: {
    borderTop: "1px solid lightgrey",
    padding: theme.spacing(1)
    // marginTop: theme.spacing(1)
  },
  timeRangeDiv: {
    maxHeight: "300px",
    overflowY: "auto",
    "&::-webkit-scrollbar": {
      width: "6px"
    },
    "&::-webkit-scrollbar-track": {
      "-webkit-box-shadow": "inset 0 0 6px lightgrey"
    },
    "&::-webkit-scrollbar-thumb": {
      borderRadius: "10px",
      backgroundColor: "lightgrey"
    }
  },
  table: {
    marginTop: theme.spacing(2),
    borderBottom: "1px solid lightgrey",
    paddingBottom: "3px"
  },
  tableRow: {
    padding: "5px",
    borderBottom: "1px solid lightgrey",
    "&:hover": {
      backgroundColor: "lightgrey",
      cursor: "pointer"
    }
  },
  tableRowAlternate: {
    padding: "5px",
    borderBottom: "1px solid lightgrey",
    backgroundColor: "#f5f5f5",
    "&:hover": {
      backgroundColor: "lightgrey",
      cursor: "pointer"
    }
  },
  datePicker: {
    color: theme.palette.primary.main
  }
}));
const UserTimeSheet = props => {
  const { user } = props;
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = useState(
    user.activity_periods[0].start_time
  );

  const [timeSlot, setTimeSlot] = useState(null);

  //compare Date with selected Date
  const filterDateFromActivity = () => {
    if (selectedDate && user.activity_periods) {
      let filterdTimeSlots = !user.activity_periods
        ? ""
        : user.activity_periods.filter(item => {
            if (selectedDate) {
              return (
                DateTime.fromFormat(item.start_time, "LLL d yyyy h:mma")
                  .toFormat("LLL d yyyy")
                  .indexOf(
                    DateTime.fromFormat(
                      selectedDate,
                      "LLL d yyyy h:mma"
                    ).toFormat("LLL d yyyy")
                  ) !== -1
              );
            }
            return null;
          });
      setTimeSlot(filterdTimeSlots);
    }
  };

  //when ever Selected Date changes check for that date in activity periods
  useEffect(() => {
    filterDateFromActivity();
  }, [selectedDate]);

  //to display Date as ex : Aug 1 2020
  const showDateFormat = date => {
    let dateformatToISO = DateTime.fromFormat(date, "LLL d yyyy h:mma").toISO();
    return DateTime.fromISO(dateformatToISO).toFormat(`LLL dd yyyy`);
  };

  // to display time ex : 1:20 PM
  const getTime = date => {
    let dateformatToISO = DateTime.fromFormat(date, "LLL d yyyy h:mma").toISO();
    return DateTime.fromISO(dateformatToISO).toFormat(`h:mm a`);
  };

  // to show the interval between two times in hrs and minutes
  const getDiffrenceOfTimeInHours = (start, end) => {
    let startISO = DateTime.fromFormat(start, "LLL d yyyy h:mma").toISO();
    let endISO = DateTime.fromFormat(end, "LLL d yyyy h:mma").toISO();

    let inter = DateTime.fromISO(endISO)
      .diff(DateTime.fromISO(startISO), ["hours", "minutes"])
      .shiftTo("hours", "minutes")
      .toObject();
    return (
      <>
        {inter.hours > 0 ? `${inter.hours} hr` : ""} {inter.minutes} min
      </>
    );
  };

  //to get the total duration between intervals in hr and minute
  const getTotalDuration = timeSlot => {
    let total = 0;
    for (let time of timeSlot) {
      let startISO = DateTime.fromFormat(
        time.start_time,
        "LLL d yyyy h:mma"
      ).toISO();
      let endISO = DateTime.fromFormat(
        time.end_time,
        "LLL d yyyy h:mma"
      ).toISO();
      let dif = DateTime.fromISO(endISO).diff(DateTime.fromISO(startISO));

      total += Number(dif);
    }

    //will get total value in milli seconds
    let totalDurationInSec = total / 1000;
    //convert it to hrs
    let hrs = Math.floor((totalDurationInSec / 3600) % 24);
    //convert it to min
    let min = Math.floor((totalDurationInSec / 60) % 60);
    return (
      <>
        {hrs}hr {min}min
      </>
    );
  };

  return (
    <Grid container className={classes.container}>
      <Grid container alignItems="center">
        <Grid item xs={12} md={7}>
          <Typography gutterBottom display="inline" color="textSecondary">
            Date : &nbsp;
          </Typography>
          <Typography display="inline" color="secondary">
            <strong>{showDateFormat(selectedDate)}</strong>
          </Typography>
        </Grid>

        <Grid item xs={12} md={5} style={{ marginBottom: "10px" }}>
          <MuiPickersUtilsProvider utils={LuxonUtils}>
            <DatePicker
              placeholder="Select Date"
              label="Select Date"
              autoOk
              style={{
                width: "100%"
              }}
              InputProps={{
                className: classes.datePicker,
                endAdornment: (
                  <InputAdornment position="end">
                    <TodayIcon />{" "}
                  </InputAdornment>
                )
              }}
              emptyLabel="Choose Date"
              value={
                selectedDate
                  ? new Date(
                      DateTime.fromFormat(
                        selectedDate,
                        "LLL d yyyy h:mma"
                      ).toISO()
                    )
                  : null
              }
              onChange={newDate => {
                setSelectedDate(
                  DateTime.fromISO(newDate).toFormat("LLL d yyyy h:mma")
                );
              }}
            />
          </MuiPickersUtilsProvider>
        </Grid>
      </Grid>
      <Grid container justify="center">
        <Grid item xs={12} md={12}>
          {timeSlot && timeSlot.length > 0 ? (
            <>
              <Grid container className={classes.table}>
                <Grid item xs={4}>
                  <Typography color="textSecondary">
                    <strong>Start Time</strong>{" "}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="textSecondary">
                    {" "}
                    <strong>End Time </strong>{" "}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography color="textSecondary">
                    {" "}
                    <strong> Duration</strong>{" "}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container className={classes.timeRangeDiv}>
                {timeSlot.map((time, index) => (
                  <Grid
                    container
                    className={
                      index % 2 === 0
                        ? classes.tableRow
                        : classes.tableRowAlternate
                    }
                    key={index}
                  >
                    <Grid item xs={4}>
                      <Typography> {getTime(time.start_time)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography> {getTime(time.end_time)}</Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography>
                        {getDiffrenceOfTimeInHours(
                          time.start_time,
                          time.end_time
                        )}
                      </Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
              <Grid container>
                <Grid
                  item
                  xs={11}
                  style={{ textAlign: "right", padding: "10px" }}
                >
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    display="inline"
                  >
                    Total Duration &nbsp;
                  </Typography>
                  <Typography variant="body1" display="inline">
                    {getTotalDuration(timeSlot)}
                  </Typography>
                </Grid>
              </Grid>
            </>
          ) : (
            <Typography color="textSecondary">
              {" "}
              No data found for selected Date{" "}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserTimeSheet;
