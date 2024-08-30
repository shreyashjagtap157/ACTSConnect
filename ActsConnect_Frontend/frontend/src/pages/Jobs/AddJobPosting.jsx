import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, TextField, Snackbar, Alert, Backdrop, CircularProgress, Grid } from "@mui/material";
import { useDispatch } from "react-redux";
import { createJobPosting } from "./jobs.actions";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useSelector } from 'react-redux';


const validationSchema = Yup.object().shape({
  title: Yup.string().required("Title is required"),
  description: Yup.string().required("Description is required"),
  company: Yup.string().required("Company is required"),
  location: Yup.string().required("Location is required"),
});

const AddJobPosting = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      company: "",
      location: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await dispatch(createJobPosting(values)).unwrap();
        setOpenSnackbar(true);
        setTimeout(() => navigate('/view-jobs'), 2000); // Redirect after 2 seconds
      } catch (error) {
        console.error('Failed to create job posting:', error);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div className="px-20">
      <Grid container spacing={0}>
        <Grid item xs={0} lg={3}>
          <div className="sticky top-0 ">
            <Sidebar />
          </div>
        </Grid>
        <Grid item xs={12} lg={9}>
          <div className="w-full flex justify-center flex-col items-center py-10">
            <form onSubmit={formik.handleSubmit} className="w-full max-w-md p-4">
              <TextField
                name="title"
                label="Job Title"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.title}
                onChange={formik.handleChange}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
              />
              <TextField
                name="description"
                label="Job Description"
                variant="outlined"
                fullWidth
                margin="normal"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                error={formik.touched.description && Boolean(formik.errors.description)}
                helperText={formik.touched.description && formik.errors.description}
              />
              <TextField
                name="company"
                label="Company"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.company}
                onChange={formik.handleChange}
                error={formik.touched.company && Boolean(formik.errors.company)}
                helperText={formik.touched.company && formik.errors.company}
              />
              <TextField
                name="location"
                label="Location"
                variant="outlined"
                fullWidth
                margin="normal"
                value={formik.values.location}
                onChange={formik.handleChange}
                error={formik.touched.location && Boolean(formik.errors.location)}
                helperText={formik.touched.location && formik.errors.location}
              />
              <div className="flex justify-end">
                <Button type="submit" variant="contained" color="primary">
                  Add Job Posting
                </Button>
              </div>
            </form>
            <Backdrop sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }} open={isLoading}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
              <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                Job Posting Created Successfully!
              </Alert>
            </Snackbar>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default AddJobPosting;
