import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { withStyles, makeStyles } from "@material-ui/core/styles";
import { fetch_all_entries } from "../components/actions";

import {
  Container,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@material-ui/core";

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

const AdminScreen = () => {
  const dispatch = useDispatch();
  const { entryItems } = useSelector(state => state.entries);

  useEffect(() => {
    dispatch(fetch_all_entries());
  }, []);

  return (
    <Container maxWidth="xl">
      <TableContainer component={Paper}>
        <Table aria-label="entries table">
          <TableHead>
            <TableCell align="center">S.No</TableCell>

            <TableCell align="center">Team Name</TableCell>
            <TableCell align="center">ID</TableCell>
            <TableCell align="center">Leader Name</TableCell>
            <TableCell align="center">Leader E-mail</TableCell>
            <TableCell align="center">Leader Phone</TableCell>
            <TableCell align="center">Film Title</TableCell>
            <TableCell align="center">Film Genre</TableCell>
            <TableCell align="center">Run Time</TableCell>
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
              entryItems.map((ent, i) => (
                <StyledTableRow key={ent.id}>
                  <TableCell align="center">{i + 1}</TableCell>
                  <TableCell align="center" component="th" scope="row">
                    {ent.team_name}
                  </TableCell>
                  <TableCell align="center">{ent.id}</TableCell>

                  <TableCell align="center">{ent.leader_name}</TableCell>
                  <TableCell align="center">{ent.email}</TableCell>
                  <TableCell align="center">{ent.phone}</TableCell>
                  <TableCell align="center">{ent.film_title}</TableCell>
                  <TableCell align="center">{ent.genre}</TableCell>
                  <TableCell align="center">{ent.rt}</TableCell>
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
                  <TableCell align="center">
                    <Button
                      href="#"
                      color="primary"
                      variant="contained"
                      size="small"
                    >
                      payment
                    </Button>
                  </TableCell>
                </StyledTableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminScreen;
