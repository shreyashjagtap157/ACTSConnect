import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { registerUser } from "../../Redux/Auth/auth.action";

const validationSchema = Yup.object().shape({
  fullName: Yup.string().required("Full Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  batchSemester: Yup.string().required("Batch Semester is required"),
  course: Yup.string().required("Course is required"),
});

function RegistrationForm() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    batchYear: "",
    batchSemester: "",
    course: "",
  };

  const handleSubmit = (values, { setSubmitting }) => {
    dispatch(registerUser(values));
    console.log(values);
    setSubmitting(false);
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue }) => (
          <Form className="space-y-5">
            <div className="space-y-5">
              <div>
                <Field
                  as={TextField}
                  name="fullName"
                  placeholder="Full Name"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="fullName"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  name="email"
                  placeholder="Email"
                  type="email"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <div>
                <Field
                  as={TextField}
                  name="password"
                  placeholder="Password"
                  type="password"
                  variant="outlined"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500"
                />
              </div>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    as={TextField}
                    name="batchYear"
                    placeholder="Batch Year"
                    type="year"
                    variant="outlined"
                    fullWidth
                  />
                  <ErrorMessage
                    name="batchYear"
                    component="div"
                    className="text-red-500"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth variant="outlined">
                    <InputLabel id="batchSemester-label">Batch Semester</InputLabel>
                    <Field
                      as={Select}
                      name="batchSemester"
                      labelId="batchSemester-label"
                      label="Batch Semester"
                      onChange={(e) => setFieldValue("batchSemester", e.target.value)}
                    >
                      <MenuItem value="MARCH">March</MenuItem>
                      <MenuItem value="SEPTEMBER">September</MenuItem>
                    </Field>
                    <ErrorMessage
                      name="batchSemester"
                      component="div"
                      className="text-red-500"
                    />
                  </FormControl>
                </Grid>
              </Grid>
              <FormControl fullWidth variant="outlined" sx={{ marginTop: "1rem" }}>
                <InputLabel id="course-label">Course</InputLabel>
                <Field
                  as={Select}
                  name="course"
                  labelId="course-label"
                  label="Course"
                  onChange={(e) => setFieldValue("course", e.target.value)}
                >
                  <MenuItem value="DAC">DAC</MenuItem>
                  <MenuItem value="DASSD">DASSD</MenuItem>
                  <MenuItem value="DMC">DMC</MenuItem>
                  <MenuItem value="DVLSI">DVLSI</MenuItem>
                  <MenuItem value="DESD">DESD</MenuItem>
                  <MenuItem value="DIOT">DIOT</MenuItem>
                  <MenuItem value="DRAT">DRAT</MenuItem>
                  <MenuItem value="DUASP">DUASP</MenuItem>
                  <MenuItem value="DAI">DAI</MenuItem>
                  <MenuItem value="DBDA">DBDA</MenuItem>
                  <MenuItem value="DHPCAP">DHPCAP</MenuItem>
                  <MenuItem value="DHPCSA">DHPCSA</MenuItem>
                  <MenuItem value="DITISS">DITISS</MenuItem>
                  <MenuItem value="DCSF">DCSF</MenuItem>
                  <MenuItem value="DFBD">DFBD</MenuItem>
                </Field>
                <ErrorMessage
                  name="course"
                  component="div"
                  className="text-red-500"
                />
              </FormControl>
            </div>
            <Button
              sx={{ padding: ".8rem 0rem" }}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
            >
              Register
            </Button>
          </Form>
        )}
      </Formik>

      <div className="flex items-center space-x-1 mt-5 justify-center">
        <p>If you already have an account?</p>
        <Button onClick={() => navigate("/login")} size="small">
          Login
        </Button>
      </div>
    </>
  );
}

export default RegistrationForm;
