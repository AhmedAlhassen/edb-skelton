import React, { useState, useRef, useEffect } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  TextField,
  CircularProgress,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";

import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import Inquery from "./Inquery";

const Neelian = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [response, data, error, loading, axiosFetch] = useAxiosFunction();
  console.log(data.length);

  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: "get",
      url: `/neelian/${values.uniNo}`,
    });
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (data && data.length !== 0) {
      toast.success("Sucess");
    }
  }, [data]);
  return (
    <Box m="20px" mt="20px">
      <ToastContainer />
      <Header title="Inquery" subtitle="Inquery Student detials" />

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
                type="text"
                label="University Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.uniNo}
                name="uniNo"
                error={!!touched.uniNo && !!errors.uniNo}
                helperText={touched.uniNo && errors.uniNo}
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
                    "Inquery"
                  )}
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>

      {data.length !== 0 && <Inquery data={data.data.data} />}
    </Box>
  );
};

const checkoutSchema = yup.object().shape({
  uniNo: yup.string().required("required"),
});

const initialValues = {
  uniNo: "",
};

export default Neelian;
