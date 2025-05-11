import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
  Box,
} from "@mui/material";
import { getFrontendReview } from "../api/tmdb-api";

type FrontEndReview = {
  ReviewId?: string;
  Writer: string;
  Review: string;
  Rating: string;
  Name: string;
  Photo: string;
};

const FrontendReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<FrontEndReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getFrontendReview();
        setReviews(data);
      } catch (err) {
        setError("Failed to load reviews.");
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography variant="h6" color="error" align="center" mt={4}>
        {error}
      </Typography>
    );
  }

  return (
    <Box p={4}>
      <Typography variant="h3" gutterBottom>
        User Reviews
      </Typography>
      <Grid container spacing={3}>
        {reviews.map((review) => (
          <Grid item xs={12} md={6} lg={4} key={review.ReviewId || review.Writer + review.Name}>
            <Card>
              <CardContent>
                <Typography variant="h5">{review.Name}</Typography>
                <img
                  src={review.Photo}
                  alt={review.Name}
                  style={{ width: "100%", height: "auto", borderRadius: "8px", marginTop: "10px" }}
                />
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  By: {review.Writer}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                  {review.Review}
                </Typography>
                <Typography variant="body1" sx={{ mt: 1 }}>
                  ⭐ Rating: {review.Rating}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default FrontendReviewsPage;
