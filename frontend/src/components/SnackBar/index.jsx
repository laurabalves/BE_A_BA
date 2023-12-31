import React from "react";

import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const MaterialSnackbar = ({ type, open, children, onClose }) => {
  const severity = type === "error" ? "error" : "success";

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={onClose}>
      <Alert severity={severity} onClose={onClose}>
        {children}
      </Alert>
    </Snackbar>
  );
};
