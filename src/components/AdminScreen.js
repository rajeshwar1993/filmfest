import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useSelector, useDispatch } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { fetch_all_entries, update_entry_db } from "../components/actions";

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
  Tooltip
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  imageDialog: {
    "& img": {
      width: "100%"
    }
  }
}));

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: "#b39ddb"
    },
    "&:nth-of-type(even)": {
      backgroundColor: "#90caf9"
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
  const { entryItems } = useSelector(state => state.entries);

  const [dialogImgIsOpen, toggleDialogImgIsOpen] = useState(false);
  const [dialogAllIsOpen, toggleDialogAllIsOpen] = useState(false);
  const [dialogObj, toggleDialogObj] = useState({});

  useEffect(() => {
    dispatch(fetch_all_entries());
  }, []);

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      toggleDialogImgIsOpen(false);
      toggleDialogAllIsOpen(false);
      toggleDialogObj({});
    }
  };

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table aria-label="entries table">
          <TableHead>
            <TableCell align="center">All Details</TableCell>
            <TableCell align="center">Submission DateTime</TableCell>
            <TableCell align="center">Team Name</TableCell>
            <TableCell align="center">Leader Name</TableCell>
            <TableCell align="center">Leader E-mail</TableCell>
            <TableCell align="center">Leader Phone</TableCell>
            <TableCell align="center">Film Title</TableCell>
            <TableCell align="center">Film Genre</TableCell>
            <TableCell align="center">Film Link</TableCell>
            <TableCell align="center">Payment Image</TableCell>
          </TableHead>
          <TableBody>
            {!entryItems && (
              <TableRow>
                {" "}
                <TableCell align="center">Items Loading</TableCell>
              </TableRow>
            )}
            {entryItems.length > 0 &&
              entryItems.map((ent, i) => {
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
                      {time.toLocaleDateString()} - {time.toLocaleTimeString()}
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
                          ent.paypic && ent.paypic.issue ? ent.paypic.issue : ""
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
                  </StyledTableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      {dialogObj && (
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
        </>
      )}
    </Container>
  );
};

export default AdminScreen;

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
        {dialogObj.paypic && <img src={dialogObj.paypic.url} />}
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
            <Button onClick={handleClose} variant="contained">
              Close
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
