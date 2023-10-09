import React from "react";
import Snackbar from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export const MaterialSnackbar = ({ open, message, handleClose, severity }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000} // Alterado para 4000 milissegundos (4 segundos)
      onClose={handleClose}
      action={
        <IconButton
          size="small"
          aria-label="Fechar"
          color="inherit"
          onClick={handleClose}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      }
    >
      <Alert severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
