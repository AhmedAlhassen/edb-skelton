import { Box, TextField, Button, CircularProgress } from "@mui/material";
import Header from "../../components/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { ToastContainer, toast } from "react-toastify";
import { useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [response, data, error, loading, axiosFetch] = useAxiosFunction();
  console.log(data.length);

  const id = JSON.parse(localStorage.getItem("presist")).id;
  const nav = useNavigate();
  console.log(id);
  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: "patch",
      url: `user/changepassword/${id}`,
      requestConfig: {
        password: values.password,
      },
    });
  };
  useEffect(() => {
    if (error) {
      toast.error(error.statusText);
    }
  }, [error]);
  useEffect(() => {
    console.log(response);
    if (data && data.length !== 0) {
      toast.success("Sucess");
      localStorage.removeItem("presist");
      nav("/login");
    }
  }, [data]);

  const checkoutSchema = yup.object().shape({
    password: yup.string().required("required"),
  });

  const initialValues = {
    password: "",
  };
  return (
    <div>
      <Box m="20px" mt="20px">
        <ToastContainer />
        <Header title="Change Password" subtitle="" />
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
                  fullWidth
                  type="password"
                  label="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  name="password"
                  error={!!touched.password && !!errors.password}
                  helperText={touched.password && errors.password}
                  sx={{ gridColumn: "span 2" }}
                />
                <Box display="flex" alignItems="baseline">
                  <Button
                    type="submit"
                    color="secondary"
                    size="large"
                    variant="contained"
                    sx={{
                      p: "15px",
                    }}
                  >
                    {loading ? (
                      <CircularProgress
                        sx={{
                          fontSize: "5px",
                        }}
                      />
                    ) : (
                      "Submit"
                    )}
                  </Button>
                </Box>
              </Box>
            </form>
          )}
        </Formik>
      </Box>
    </div>
  );
};

export default ChangePassword;
