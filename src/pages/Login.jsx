import React from "react";
import {
  Box,
  Typography,
  FormControl,
  TextField,
  FormHelperText,
  Button,
} from "@mui/material";
import { Formik } from "formik";
import { loginValidationSchema } from "../validationSchema/login.validation.schema";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import { CircularProgress, LinearProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const { isPending, mutate } = useMutation({
    mutationKey: ["login-user"],
    mutationFn: async (values) => {
      console.log(values);
      return await $axios.post("/user/login", values);
    },
    onSuccess: (res) => {
      console.log(res);
      navigate("/home");
    },
    onError: (error) => {
      console.log(error.response.data.message);
    },
  });

  return (
    <>
      {isPending && <LinearProgress color="secondary" />}
      <Box>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginValidationSchema}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => {
            return (
              <form
                onSubmit={formik.handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                  padding: "1rem",
                  gap: "1rem",
                  width: "400px",
                  boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
                }}
              >
                <Typography variant="h4">Sign in</Typography>
                <FormControl>
                  <TextField label="Email" {...formik.getFieldProps("email")} />
                  {formik.touched.email && formik.errors.email ? (
                    <FormHelperText error>{formik.errors.email}</FormHelperText>
                  ) : null}
                </FormControl>

                <FormControl>
                  <TextField
                    label="Password"
                    {...formik.getFieldProps("password")}
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <FormHelperText error>
                      {formik.errors.password}
                    </FormHelperText>
                  ) : null}
                </FormControl>

                <Button
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={isPending}
                >
                  Login
                </Button>

                <Link to="/register">New here? Register</Link>
              </form>
            );
          }}
        </Formik>
      </Box>
    </>
  );
};

export default Login;
