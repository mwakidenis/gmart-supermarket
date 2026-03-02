import * as React from "react";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

export default function BasicRating() {
  const [value, setValue] = React.useState(0);
  const [feedback, setFeedback] = React.useState("");
  let { id } = useParams();
  const navigate=useNavigate();

  const sendFeedback = async () => {
    try {
      const response = await axios.put(`https://gmart.vercel.app/updateFeedback/${id}`, {
        rating: value,
        feedback: feedback,
      });
      console.log(response.data);

      setTimeout(() => {
        navigate("/orders");
      }, 1000);
    } catch (error) {
      console.error("Error sending feedback:", error);
    }
  }

  return (
    <>
      <div className="w-full flex  justify-center">
        <div className="mt-[120px] shadow-lg p-14 flex flex-col gap-5 w-1/2">
          <h1 className="text-3xl font-bold">Feedback</h1>
          <h1 className="text-xl font-bold">Order ID: {id}</h1>
          <Box
            sx={{
              "& > legend": { mt: 2 },
            }}
          >
            <Typography component="legend">Rate</Typography>
            <Rating
              name="simple-controlled"
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue);
                console.log(newValue);
              }}
            />
          </Box>

          <Typography component="legend">Feedback</Typography>
          <TextField
            id="outlined-multiline-static"
            label="Feedback"
            multiline
            rows={4}
            defaultValue=""
            variant="outlined"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value)}}
          />

          <Button
            variant="contained"
            className="mt-5"
            
            onClick={() => {
              if(value===0 && feedback===""){
                toast("Please provide a rating", {
                  icon: '🙌',
                });
                return;
              }
              
              sendFeedback();
            }}
          >
            Submit
          </Button>
        </div>
      </div>
    </>
  );
}
