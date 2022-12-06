import { Alert } from "@mui/material";
import Snackbar from "@mui/material/Snackbar";
import { useState } from "react";

export default function ErrorSnackBar({ error }) {
  const [state, setState] = useState(true);

  const handleClose = () => {
    setState(false);
  };

  return (
    <div>
      <Snackbar
        open={state}
        autoHideDuration={6000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          {error}
        </Alert>
      </Snackbar>
    </div>
  );
}
