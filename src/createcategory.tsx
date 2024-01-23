import * as React from "react";
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
import { Link, useParams } from "react-router-dom";
export default function AddCategoryDialog() {
    const {courseid} = useParams()
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>Add Category</Button>

      <Dialog
        //Creates the course then adds the creator to the course
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            fetch("http://127.0.0.1:3000/api/admin/courses/"+courseid+"/categories/createcategory", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(formJson),
              credentials: "include",
            }).then((response) => {
              if (response.ok) {
                console.log("new category added");
              }
            });
            handleClose();
          },
        }}
      >
        <DialogTitle>Add Category</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please enter the title and description of the category you wish to
            add.
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
