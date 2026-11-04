import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Paper,
  Rating,
  Grid
} from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import toast from "react-hot-toast";

// Validation schema with zod
const feedbackSchema = z.object({
  name: z.string().min(2, "Name is required").max(100, "Name is too long"),
  email: z.string().email("Invalid email address").nonempty("Email is required"),
  feedbackText: z.string().min(10, "Feedback must be at least 10 characters").max(1000, "Feedback is too long"),
  rating: z.number().min(1, "Rating is required").max(5, "Rating cannot exceed 5"),
});

export default function FeedbackForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      name: "",
      email: "",
      feedbackText: "",
      rating: 0,
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        "https://gmart-supermarket.vercel.app/submit-feedback",
        {
          name: data.name,
          email: data.email,
          rating: data.rating,
          feedback: data.feedbackText,
        }
      );
      console.log("Feedback submitted successfully:", response.data);
      toast.success("Feedback submitted successfully!");
      reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
        toast.error("Failed to submit feedback");
    }
  };

  return (
    <Box className="flex justify-center items-center h-screen w-full mt-12">
      <Paper elevation={8} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
        <Typography variant="h4" align="center" sx={{ fontWeight: 'bold', mb: 2 }}>
          Submit Your Feedback
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                fullWidth
                variant="outlined"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                fullWidth
                variant="outlined"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email ? errors.email.message : ""}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography component="legend" sx={{ mt: 2 }}>Rating</Typography>
              <Rating
                name="rating"
                onChange={(event, newValue) => setValue("rating", newValue || 0)}
              />
              {errors.rating && (
                <Typography variant="body2" color="error">
                  {errors.rating.message}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Feedback"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                {...register("feedbackText")}
                error={!!errors.feedbackText}
                helperText={errors.feedbackText ? errors.feedbackText.message : "Tell us more about your experience"}
              />
            </Grid>
          </Grid>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            type="submit"
            sx={{
              mt: 3,
              p: 1,
              fontWeight: 'bold',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#155fa0' },
            }}
          >
            Submit Feedback
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
