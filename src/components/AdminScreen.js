import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  fetch_all_entries,
  update_entry_db,
  delete_entry_db
} from "../components/actions";

import {
  Container,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  Grid,
  Tooltip,
  CircularProgress,
  Typography,
  FormControlLabel,
  Checkbox,
  Chip
} from "@material-ui/core";

const useStyles = makeStyles(theme => {
  return {
    imageDialog: {
      "& img": {
        width: "100%"
      }
    }
  };
});

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#203d52"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#552f2f"
    }
  }
}))(TableRow);

const HtmlTooltip = withStyles(theme => ({
  tooltip: {
    maxWidth: 220,
    fontSize: "16px",
    border: "1px solid #dadde9"
  }
}))(Tooltip);

const AdminScreen = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const { entryItems, entryDataLoading } = useSelector(state => state.entries);

  const [dialogImgIsOpen, toggleDialogImgIsOpen] = useState(false);
  const [dialogAllIsOpen, toggleDialogAllIsOpen] = useState(false);
  const [dialogStatusIsOpen, toggleDialogStatusIsOpen] = useState(false);
  const [dialogLoadingIsOpen, toggleDialogLoadingIsOpen] = useState(false);
  const [dialogObj, toggleDialogObj] = useState({});
  const [searchText, updateSearchText] = useState("");
  const [payFilter, updatePayFilter] = useState({
    i: false,
    s: false,
    u: false
  });
  const [sortBy, updateSortBy] = useState({
    genre: false
  });

  useEffect(() => {
    dispatch(fetch_all_entries());
  }, []);

  useEffect(() => {
    toggleDialogLoadingIsOpen(entryDataLoading);
  }, [entryDataLoading]);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      toggleDialogImgIsOpen(false);
      toggleDialogAllIsOpen(false);
      toggleDialogStatusIsOpen(false);
      toggleDialogObj({});
    }
  };

  return (
    <>
      <Paper>
        <Grid
          container
          style={{
            marginTop: "20px",
            marginBottom: "20px",
            padding: "20px",
            borderRadius: "4px"
          }}
        >
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              name="searchtext"
              id="searchtext"
              label={"Team/Leader Name, Email, Title"}
              value={searchText}
              onChange={e => {
                updateSearchText(e.nativeEvent.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography variant="body1">Filter By:</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={payFilter.i}
                  onChange={() => {
                    updatePayFilter({
                      ...payFilter,
                      i: !payFilter.i
                    });
                  }}
                />
              }
              label={<Typography variant="body2">Pay-I</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={payFilter.s}
                  onChange={() => {
                    updatePayFilter({
                      ...payFilter,
                      s: !payFilter.s
                    });
                  }}
                />
              }
              label={<Typography variant="body2">Pay-S</Typography>}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={payFilter.u}
                  onChange={() => {
                    updatePayFilter({
                      ...payFilter,
                      u: !payFilter.u
                    });
                  }}
                />
              }
              label={<Typography variant="body2">Pay-U</Typography>}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="body1">Sort By:</Typography>
            <FormControlLabel
              control={
                <Checkbox
                  checked={sortBy.genre}
                  onChange={() => {
                    updateSortBy({
                      ...sortBy,
                      genre: !sortBy.genre
                    });
                  }}
                />
              }
              label={<Typography variant="body2">Genre</Typography>}
            />
          </Grid>
          <Grid item xs={12} md={2}>
            <Button
              onClick={() => {
                dispatch(fetch_all_entries());
              }}
              variant="contained"
              color={"primary"}
              size="small"
            >
              Refresh List
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <TableContainer component={Paper}>
        <Table aria-label="entries table">
          <TableHead>
            <TableCell align="center">All Details</TableCell>
            <TableCell align="center">DateTime</TableCell>
            <TableCell align="center">Team</TableCell>
            <TableCell align="center">Leader</TableCell>
            <TableCell align="center">E-mail</TableCell>
            <TableCell align="center">Phone</TableCell>
            <TableCell align="center">Title</TableCell>
            <TableCell align="center">Genre</TableCell>
            <TableCell align="center">Link</TableCell>
            <TableCell align="center">Payment</TableCell>
            <TableCell align="center">Status</TableCell>
          </TableHead>
          <TableBody>
            {!entryItems && (
              <TableRow>
                {" "}
                <TableCell align="center">Items Loading</TableCell>
              </TableRow>
            )}
            {entryItems.length > 0 &&
              entryItems
                .filter(ent => {
                  return (
                    ent.team_name
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    ent.leader_name
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    ent.film_title
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase()) ||
                    ent.email
                      .toLowerCase()
                      .includes(searchText.toLocaleLowerCase())
                  );
                })
                .filter(ent => {
                  return (
                    (payFilter.i && ent.paypic.issue) ||
                    (payFilter.s && ent.paypic.verified) ||
                    (payFilter.u &&
                      !ent.paypic.issue &&
                      !ent.paypic.verified) ||
                    (!payFilter.i && !payFilter.s && !payFilter.u)
                  );
                })
                .sort((a, b) => {
                  if (!sortBy.genre) return 0;
                  else {
                    if (a.genre < b.genre) return -1;
                    else if (a.genre > b.genre) return 1;
                    else return 0;
                  }
                })
                .map((ent, i) => {
                  let time = "";
                  if (ent.ts) {
                    let timeObj = new firebase.firestore.Timestamp(
                      ent.ts.seconds,
                      ent.ts.nanoseconds
                    );
                    time = timeObj.toDate();
                  }

                  return (
                    <StyledTableRow key={ent.id}>
                      <TableCell align="center">
                        <HtmlTooltip
                          title={"All Details"}
                          aria-label="All Details"
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClickCapture={() => {
                              toggleDialogAllIsOpen(true);
                              toggleDialogObj(ent);
                            }}
                          >
                            {i + 1}
                          </Button>
                        </HtmlTooltip>
                      </TableCell>
                      <TableCell align="center">
                        {time.toLocaleDateString()} -{" "}
                        {time.toLocaleTimeString()}
                      </TableCell>
                      <TableCell align="center" component="th" scope="row">
                        {ent.team_name}
                      </TableCell>
                      <TableCell align="center">{ent.leader_name}</TableCell>
                      <TableCell align="center">{ent.email}</TableCell>
                      <TableCell align="center">
                        <Button
                          href={`tel:${ent.phone}`}
                          variant="contained"
                          size="small"
                          color="primary"
                        >
                          {ent.phone}
                        </Button>
                      </TableCell>
                      <TableCell align="center">{ent.film_title}</TableCell>
                      <TableCell align="center">{ent.genre}</TableCell>
                      <TableCell align="center">
                        <Button
                          href={ent.link}
                          variant="contained"
                          size="small"
                          target="_blank"
                          color="primary"
                        >
                          film
                        </Button>
                      </TableCell>
                      <TableCell
                        align="center"
                        style={{
                          backgroundColor: ent.paypic.verified
                            ? "#4ca63c"
                            : ent.paypic.issue
                            ? "#a03838"
                            : "unset"
                        }}
                      >
                        <HtmlTooltip
                          title={
                            ent.paypic && ent.paypic.issue
                              ? ent.paypic.issue
                              : ""
                          }
                          aria-label="issue"
                        >
                          <Button
                            color="primary"
                            variant="contained"
                            size="small"
                            onClickCapture={() => {
                              toggleDialogImgIsOpen(true);
                              toggleDialogObj({
                                id: ent.id,
                                paypic: ent.paypic
                              });
                            }}
                          >
                            payment
                          </Button>
                        </HtmlTooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Button
                          color="primary"
                          size="small"
                          onClick={() => {
                            toggleDialogStatusIsOpen(true);
                            toggleDialogObj(ent);
                          }}
                        >
                          <Typography variant="caption">
                            Update Status
                          </Typography>
                        </Button>
                        {Object.keys(ent.status).length > 0 && (
                          <>
                            {ent.status.we && (
                              <div>
                                {" "}
                                <Chip size="small" label="Welcome Email Sent" />
                              </div>
                            )}
                            {ent.status.fv && (
                              <div>
                                {" "}
                                <Chip size="small" label="Film Link Verified" />
                              </div>
                            )}
                            {ent.status.fd && (
                              <div>
                                {" "}
                                <Chip size="small" label="Film Downloaded" />
                              </div>
                            )}
                          </>
                        )}
                      </TableCell>
                    </StyledTableRow>
                  );
                })}
          </TableBody>
        </Table>
      </TableContainer>
      {(dialogImgIsOpen ||
        dialogAllIsOpen ||
        dialogLoadingIsOpen ||
        dialogStatusIsOpen) && (
        <>
          <PayDialog
            handleClose={handleClose}
            dialogIsOpen={dialogImgIsOpen}
            classes={classes}
            dialogObj={dialogObj}
            dispatch={dispatch}
          />
          <AllDetailsDialog
            handleClose={handleClose}
            dialogIsOpen={dialogAllIsOpen}
            classes={classes}
            dialogObj={dialogObj}
            dispatch={dispatch}
          />
          <StatusDialog
            handleClose={handleClose}
            dialogIsOpen={dialogStatusIsOpen}
            classes={classes}
            dialogObj={dialogObj}
            dispatch={dispatch}
          />
          <LoadingDialog
            handleClose={handleClose}
            dialogIsOpen={dialogLoadingIsOpen}
            classes={classes}
            dialogObj={dialogObj}
          />
        </>
      )}
    </>
  );
};

export default AdminScreen;

const LoadingDialog = ({ handleClose, dialogIsOpen, classes }) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogIsOpen}
      maxWidth={"lg"}
      className={classes.imageDialog}
    >
      <DialogTitle id="title">Please wait ...</DialogTitle>
      <DialogContent>
        <CircularProgress />
      </DialogContent>
    </Dialog>
  );
};

const PayDialog = ({
  handleClose,
  dialogIsOpen,
  classes,
  dialogObj,
  dispatch
}) => {
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogIsOpen}
      maxWidth={"lg"}
      className={classes.imageDialog}
    >
      <DialogTitle id="title">
        <Grid container>
          <Grid item xs={6}>
            {"Payment Image"}
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        {dialogObj.paypic && <img src={dialogObj.paypic.url} alt="payment" />}
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                dispatch(
                  update_entry_db(dialogObj.id, {
                    paypic: {
                      ...dialogObj.paypic,
                      verified: true,
                      issue: false
                    }
                  })
                );
                handleClose();
              }}
              color="primary"
              variant="contained"
            >
              Verify
            </Button>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              name="issue"
              id="issue"
              label="Issue Description"
              defaultValue={
                dialogObj.paypic && dialogObj.paypic.issue
                  ? dialogObj.paypic.issue
                  : ""
              }
            />
            <Button
              onClick={() => {
                dispatch(
                  update_entry_db(dialogObj.id, {
                    paypic: {
                      ...dialogObj.paypic,
                      verified: false,
                      issue: document.getElementById("issue").value
                    }
                  })
                );
                handleClose();
              }}
              variant="contained"
            >
              Raise Issue
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

const AllDetailsDialog = ({
  handleClose,
  dialogIsOpen,
  classes,
  dialogObj,
  dispatch
}) => {
  const [enableDisable, toggleEnableDisable] = useState(false);

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogIsOpen}
      maxWidth={"lg"}
      className={classes.imageDialog}
    >
      <DialogTitle id="title">
        <Grid container>
          <Grid item xs={6}>
            {dialogObj.team_name} - {dialogObj.film_title}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="delText"
              id="delText"
              placeholder={dialogObj.team_name}
              onChange={e => {
                if (e.nativeEvent.target.value === dialogObj.team_name)
                  toggleEnableDisable(true);
                else toggleEnableDisable(false);
              }}
            />
            <Button
              onClick={() => {
                dispatch(delete_entry_db(dialogObj.id));
                handleClose();
              }}
              variant="contained"
              color={"danger"}
              disabled={!enableDisable}
            >
              Delete Entry
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid
            container
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px",
              borderBottom: "1px solid"
            }}
          >
            <Grid item xs={4}>
              Team Name:
            </Grid>
            <Grid item xs={8}>
              {dialogObj.team_name}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px",
              borderBottom: "1px solid"
            }}
          >
            <Grid item xs={4}>
              Film Title:
            </Grid>
            <Grid item xs={8}>
              {dialogObj.film_title}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px",
              borderBottom: "1px solid"
            }}
          >
            <Grid item xs={4}>
              Run time:
            </Grid>
            <Grid item xs={8}>
              {dialogObj.rt}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px",
              borderBottom: "1px solid"
            }}
          >
            <Grid item xs={4}>
              Synopsys:
            </Grid>
            <Grid item xs={8}>
              {dialogObj.synop}
            </Grid>
          </Grid>
          <Grid
            container
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px",
              borderBottom: "1px solid"
            }}
          >
            <Grid item xs={4}>
              Music:
            </Grid>
            <Grid item xs={8}>
              {dialogObj.md}
            </Grid>
          </Grid>
          <Grid
            item
            xs={12}
            style={{
              paddingBottom: "15px",
              paddingTop: "15px"
            }}
          >
            Team Member details:
          </Grid>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="entries table">
                <TableHead>
                  <TableCell align="center">S.no</TableCell>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">Role</TableCell>
                </TableHead>
                <TableBody>
                  {dialogObj &&
                    dialogObj.team &&
                    dialogObj.team.map((t, i) => (
                      <StyledTableRow key={i}>
                        <TableCell align="center">{i + 1}</TableCell>
                        <TableCell align="center">{t.nm}</TableCell>
                        <TableCell align="center">{t.em}</TableCell>
                        <TableCell align="center">{t.role}</TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" variant="contained">
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const StatusDialog = ({
  handleClose,
  dialogIsOpen,
  classes,
  dialogObj,
  dispatch
}) => {
  const [stats, updateStats] = useState(dialogObj.status || {});

  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={dialogIsOpen}
      maxWidth={"lg"}
      className={classes.imageDialog}
    >
      <DialogTitle id="title">
        <Grid container>
          <Grid item xs={6}>
            {"Entry Status"}
          </Grid>
          <Grid item xs={6}>
            <Button onClick={handleClose} variant="contained">
              Close
            </Button>
          </Grid>
        </Grid>
      </DialogTitle>
      <DialogContent>
        <FormControlLabel
          control={
            <Checkbox
              checked={stats.we}
              onChange={e => {
                updateStats({
                  ...stats,
                  we: e.nativeEvent.target.checked
                });
              }}
            />
          }
          label={<Typography variant="body2">Welcome Email Sent</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stats.fv}
              onChange={e => {
                updateStats({
                  ...stats,
                  fv: e.nativeEvent.target.checked
                });
              }}
            />
          }
          label={<Typography variant="body2">Film Link Verified</Typography>}
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={stats.fd}
              onChange={e => {
                updateStats({
                  ...stats,
                  fd: e.nativeEvent.target.checked
                });
              }}
            />
          }
          label={<Typography variant="body2">Film Link Downloaded</Typography>}
        />
      </DialogContent>
      <DialogActions>
        <Grid container>
          <Grid item xs={12}>
            <Button
              onClick={() => {
                dispatch(
                  update_entry_db(dialogObj.id, {
                    status: {
                      ...stats
                    }
                  })
                );
                handleClose();
              }}
              color="primary"
              variant="contained"
            >
              Save
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};
