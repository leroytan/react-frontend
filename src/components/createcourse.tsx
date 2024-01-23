import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import AddIcon from "@mui/icons-material/Add";
import React, { useState } from "react";

export default function AddCourseDialog() {
    
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Card
        sx={{
          width: 250,
          maxWidth: 250,
          height: 320,
          backgroundColor: "InactiveCaptionText",
        }}
      >
        <CardActionArea
          onClick={handleClickOpen}
          sx={{ height: 320, display: "flex", justifyContent: "center" }}
        >
          <CardContent>
            <AddIcon fontSize="large" />
          </CardContent>
        </CardActionArea>
      </Card>

      <Dialog
        //Creates the course then adds the creator to the course
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            fetch(process.env.REACT_APP_API_KEY+"/api/admin/courses/createcourse", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formJson),
              credentials: "include",
            }).then((response) => {
              if (response.ok) {
                console.log("new course added");
              }
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Create course</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and description of the course you wish to
            create.
          </DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="title"
            name="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Create</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
