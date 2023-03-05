import { useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";

import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import useAuth from "../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import axios from "../../api/axios";

const theme = createTheme();

export default function SignIn() {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const navigate = useNavigate();
  const { setAuth, auth } = useAuth();
  const [Login, data, error, loading, axiosFetch] = useAxiosFunction();

  const handleFormSubmit = async (values) => {
    console.log(values);
    await axiosFetch({
      axiosInstance: axios,
      method: "post",
      url: "/auth/login",
      requestConfig: {
        username: values.username,
        password: values.password,
      },
    });
    if (Login) {
      console.log("test");
      const res = await axios.get("/auth/is_authenticated");
      console.log(res.data.data);
      const { id, username, role, bracnh } = res.data.data;
      // localStorage.setItem("persist", JSON.stringify({ username, role }));
      setAuth({ id, username, role, bracnh });
      console.log(auth);
    }
    navigate("/");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box m="20px" mt="20px" sx={{ width: "100%" }}>
            <Formik
              onSubmit={handleFormSubmit}
              initialValues={initialValues}
              validationSchema={checkoutSchema}
            >
              {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                  <Box
                    display="grid"
                    gap="30px"
                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                    sx={{
                      "& > div": {
                        gridColumn: isNonMobile ? undefined : "span 4",
                      },
                    }}
                  >
                    <TextField
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ gridColumn: "span 4" }}
                    />
                    <TextField
                      required
                      fullWidth
                      type="password"
                      id="password"
                      label="Password"
                      name="password"
                      autoComplete="password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ gridColumn: "span 4" }}
                    />
                  </Box>
                  <Box
                    display="flex"
                    alignItems="baseline"
                    justifyContent="center"
                  >
                    {" "}
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
const checkoutSchema = yup.object().shape({
  username: yup.string().required("required"),
  password: yup.string().required("required"),
});

const initialValues = {
  username: "",
  password: "",
};
