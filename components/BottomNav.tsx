import ChatIcon from "@mui/icons-material/Chat";
import FitnessCenterIcon from "@mui/icons-material/FitnessCenter";
import PersonIcon from "@mui/icons-material/Person";
import {AppBar, Grid, IconButton, Typography} from "@mui/material";
import Link from "next/link";
import {useRouter} from "next/router";
import * as React from "react";
import {useState} from "react";
import palette from "../styles/palette";
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BottomAppBar() {
    const [value, setValue] = useState(0);
    const router = useRouter();
    const activeColor = palette.secondary.main;

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <AppBar position="fixed"
                color="default"
                sx={{top: "auto", bottom: 0}}>

            <style jsx>{`
              .active {
                color: ${activeColor};
              }
            `}</style>
            <Grid
                container
                display="flex"
                alignItems="center"
                justifyContent="space-evenly"
                direction="row"            >
                <Grid>
                    <IconButton color="inherit">
                        <Link href="/classes"
                              replace={false}>
                            <div className={router.pathname === "/classes" ? "active" : ""}>
                                <FitnessCenterIcon />
                                <Typography variant="subtitle2">운동시설</Typography>
                            </div>
                        </Link>
                    </IconButton>
                    <IconButton color="inherit">
                        <Link href="/chat">
                            <div className={router.pathname === "/chat" ? "active" : ""}>
                                <ChatIcon />
                                <Typography variant="subtitle2">채팅</Typography>
                            </div>
                        </Link>
                    </IconButton>
                    <IconButton color="inherit">
                        <Link href="/profile">
                            <div className={router.pathname === "/profile" ? "active" : ""}>
                                <PersonIcon />
                                <Typography variant="subtitle2">내정보</Typography>
                            </div>
                        </Link>
                    </IconButton>
                    <IconButton color="inherit">
                        <Link href="/map">
                            <div className={router.pathname === "/map" ? "active" : ""}>
                                <LocationOnIcon />
                                <Typography variant="subtitle2">map</Typography>
                            </div>
                        </Link>
                    </IconButton>
                </Grid>
            </Grid>
        </AppBar>
    );
}
