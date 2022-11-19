import AddIcon from "@mui/icons-material/Add";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Grid, styled, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Fab from "@mui/material/Fab";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";

const StyledFab = styled(Fab)({
  //   position: "absolute",
  //   zIndex: 1,
  //   top: -30,
  //   left: 0,
  //   right: 0,
  //   margin: "0 auto",
  margin: 0,
  top: "auto",
  right: 30,
  bottom: 100,
  left: "auto",
  position: "fixed",
});

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Grid container spacing={1}>
            <Grid
              xs={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit" aria-label="open drawer">
                <FitnessCenterIcon />
              </IconButton>
              <Typography variant="subtitle2">Fitness</Typography>
            </Grid>
            <Grid
              xs={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit">
                <CheckBoxIcon />
              </IconButton>
              <Typography variant="subtitle2">Reservations</Typography>
            </Grid>
            <Grid
              xs={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit">
                <AddShoppingCartIcon />
              </IconButton>
              <Typography variant="subtitle2">Membership</Typography>
            </Grid>
            <Grid
              xs={3}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit">
                <MoreHorizIcon />
              </IconButton>
              <Typography variant="subtitle2">More</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <StyledFab color="secondary" aria-label="add">
        <AddIcon />
      </StyledFab>
    </React.Fragment>
  );
}
