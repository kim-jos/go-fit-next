import ChatIcon from "@mui/icons-material/Chat";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonIcon from "@mui/icons-material/Person";
import { Grid, Typography } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Link from "next/link";
import * as React from "react";

export default function BottomAppBar() {
  return (
    <React.Fragment>
      <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
        <Toolbar>
          <Grid container>
            <Grid
              container
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit" aria-label="open drawer">
                <Link href="/classes">
                  <FitnessCenterIcon />
                </Link>
              </IconButton>
              <Typography variant="subtitle2">Fitness</Typography>
            </Grid>
            <Grid
              container
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit">
                <Link href="/chat">
                  <ChatIcon />
                </Link>
              </IconButton>
              <Typography variant="subtitle2">Chat</Typography>
            </Grid>
            <Grid
              container
              xs={4}
              display="flex"
              justifyContent="center"
              alignItems="center"
              direction="column"
              item
            >
              <IconButton color="inherit">
                <Link href="/profile">
                  <PersonIcon />
                </Link>
              </IconButton>
              <Typography variant="subtitle2">Profile</Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
