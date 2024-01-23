import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { useEffect, useState } from "react";
import { PollsOptionsVotes } from "../types/polloptions";
import { User } from "../types/user";
import { Post } from "../types/post";
import { Divider, Snackbar } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { pink, teal } from "@mui/material/colors";

export default function VerticalLikeDislike(prop: {
  courseid: number | undefined;
  categoryid: number | undefined;
  subcategoryid: number | undefined;
  postid: number | undefined;
  post: Post | undefined;
  userpollsvotes: PollsOptionsVotes[] | undefined;
}) {
  const [view, setView] = useState<string | undefined>(undefined);
  const [upvoteid, setUpvoteID] = useState<number>();
  const [downvoteid, setDownvoteID] = useState<number>();
  const [upvotecount, setUpvotecount] = useState<number>();
  const [downvotecount, setDownvotecount] = useState<number>();

  const [opennotif, setOpennotif] = useState(false);


  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpennotif(false);
  };
  //user votes

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    //Denies if user is post owner
    const userdata = localStorage.getItem("user");
    if (userdata != null) {
      const user: User = JSON.parse(userdata).user;
      if (user.Username === prop.post!.Username) {
        setOpennotif(true);
        return;
      }
    }

    //sends the vote to the server
    fetch(
      "http://127.0.0.1:3000/api/courses/" +
        prop.courseid +
        "/categories/" +
        prop.categoryid +
        "/subcategories/" +
        prop.subcategoryid +
        "/posts/" +
        prop.postid +
        "/pollsoptions/" +
        (nextView === "Upvote"
          ? upvoteid
          : nextView === "Downvote"
          ? downvoteid
          : nextView === null
          ? view === "Upvote"
            ? upvoteid
            : downvoteid
          : null),
      {
        credentials: "include",
        method: "POST",
      }
    ).then((response) => {
      if (response.ok) {
        //change the view for user

        if (view === "Upvote") {
          if (nextView === null) {
            setUpvotecount(upvotecount! - 1);
          } else if (nextView === "Downvote") {
            setUpvotecount(upvotecount! - 1);
            setDownvotecount(downvotecount! + 1);
          }
        } else if (view === "Downvote") {
          if (nextView === null) {
            setDownvotecount(downvotecount! - 1);
          } else if (nextView === "Upvote") {
            setUpvotecount(upvotecount! + 1);
            setDownvotecount(downvotecount! - 1);
          }
        } else if (!view) {
          if (nextView === "Upvote") {
            setUpvotecount(upvotecount! + 1);
          }
          if (nextView === "Downvote") {
            setDownvotecount(downvotecount! + 1);
          }
        }
        setView(nextView);
      }
    });
  };
  useEffect(() => {
    setView("");
    //attach the upvoteid/downvoteid to the buttons
    prop.post!.PollsOptions!.map((elem) => {
      if (elem.Title === "Upvote") {
        setUpvoteID(elem.ID);
      } else if (elem.Title === "Downvote") {
        setDownvoteID(elem.ID);
      }
    });
  }, [prop]);
  useEffect(() => {
    //attach the upvotecount/downvotecount to the view
    if (prop.userpollsvotes) {
      console.log("setvotecount");
      setUpvotecount(prop.post!.Upvotecount);
      setDownvotecount(prop.post!.Downvotecount);
      const pollvotes: PollsOptionsVotes[] = prop.userpollsvotes;
      pollvotes.map((pollvote) => {
        if (pollvote.PollsOptionsID == upvoteid) {
          setView("Upvote");
        } else if (pollvote.PollsOptionsID == downvoteid) {
          setView("Downvote");
        }
      });
    }
  }, [upvoteid, downvoteid]);

  return (
    <>
    {/*Tells user that they cannot like/dislike their own post*/}
      <Snackbar
        open={opennotif}
        autoHideDuration={5000}
        onClose={handleClose}
        message="You cannot like/dislike your own post."
      />
      {/*Like and dislike buttons*/}
      <ToggleButtonGroup
        orientation="vertical"
        value={view}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value="Upvote" aria-label="Upvote" color="success">
          <Grid container spacing={2} width={70} maxWidth={70} height={50}>
            <Grid
              paddingRight={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              {upvotecount}
            </Grid>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Grid
              paddingLeft={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ThumbUpIcon style={{ color: teal[600] }} fontSize="large" />
            </Grid>
          </Grid>
        </ToggleButton>
        <ToggleButton value="Downvote" aria-label="Downvote" color="warning">
          <Grid container spacing={2} width={70} maxWidth={70} height={50}>
            <Grid
              paddingRight={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <div>{downvotecount}</div>
            </Grid>

            <Divider orientation="vertical" variant="middle" flexItem />

            <Grid
              paddingLeft={2}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <ThumbDownIcon style={{ color: pink[500] }} fontSize="large" />
            </Grid>
          </Grid>
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}
