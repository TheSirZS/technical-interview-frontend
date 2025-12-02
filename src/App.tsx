import { useEffect } from "react";

import {
  Box,
  Card,
  Paper,
  Stack,
  Alert,
  Rating,
  Button,
  TextField,
  CardMedia,
  Container,
  Typography,
  CardContent,
  CircularProgress,
} from "@mui/material";

import { Form, Formik } from "formik";

import { useProductContext } from "./contexts/ProductContext";

export const App: React.FC = () => {
  const {
    products,
    error,
    loading,
    clearError,
    getProducts,
    handleSubmitReview,
  } = useProductContext();

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h2" marginY={2}>
        {"Products List"}
      </Typography>
      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", py: 10 }}>
          <CircularProgress size={70} thickness={4} />
        </Box>
      )}
      {!loading && error && <Alert severity="error">{error}</Alert>}
      {!loading && error && (
        <Box
          sx={{
            marginY: 2,
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <Button variant="contained" onClick={() => clearError()}>
            Refresh
          </Button>
        </Box>
      )}
      {!loading && !error && (
        <Stack spacing={4}>
          {products.map((product) => (
            <Card
              key={product.id}
              sx={{
                p: 2,
                boxShadow: 4,
                borderRadius: 3,
                background: "#fafafa",
              }}
            >
              <Box sx={{ display: "flex", gap: 3 }}>
                <CardMedia
                  component="img"
                  sx={{ width: 180, height: 180, borderRadius: 3 }}
                  image={product.image}
                  alt={product.name}
                />

                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    {product.name}
                  </Typography>

                  <Stack spacing={1}>
                    {product.reviews.map((review, idx) => (
                      <Paper key={idx} sx={{ p: 2, borderRadius: 2 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {review.reviewer}
                        </Typography>
                        <Rating value={review.rating} readOnly sx={{ mb: 1 }} />
                        <Typography variant="body2" color="text.secondary">
                          {review.comment}
                        </Typography>
                      </Paper>
                    ))}
                  </Stack>

                  <Box sx={{ mt: 3 }}>
                    <Typography fontWeight={600} mb={1}>
                      Add new review
                    </Typography>

                    <Formik
                      initialValues={{ reviewer: "", rating: 0, comment: "" }}
                      onSubmit={(values, { resetForm }) => {
                        handleSubmitReview(product.id, values);
                        resetForm();
                      }}
                    >
                      {({
                        values,
                        handleChange,
                        setFieldValue,
                        isSubmitting,
                      }) => (
                        <Form>
                          <Stack spacing={2}>
                            <TextField
                              name="reviewer"
                              label="Who reviews?"
                              fullWidth
                              value={values.reviewer}
                              onChange={handleChange}
                            />

                            <Rating
                              name="rating"
                              value={values.rating}
                              onChange={(_, value) =>
                                setFieldValue("rating", value)
                              }
                            />

                            <TextField
                              name="comment"
                              label="Add your comment"
                              fullWidth
                              multiline
                              rows={3}
                              value={values.comment}
                              onChange={handleChange}
                            />

                            <Button
                              type="submit"
                              variant="contained"
                              disabled={isSubmitting}
                            >
                              Send
                            </Button>
                          </Stack>
                        </Form>
                      )}
                    </Formik>
                  </Box>
                </CardContent>
              </Box>
            </Card>
          ))}
        </Stack>
      )}
    </Container>
  );
};
