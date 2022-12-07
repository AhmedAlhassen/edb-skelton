import React, { useState, useRef } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  TextField,
  CardContent,
  Typography,
  CardActions,
} from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "../../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

const Neelian = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [errMsg, setErrMsg] = useState("");
  const [student, setStudent] = useState();
  const recipttRef = useRef();
  const navigate = useNavigate();
  const handlePrint = useReactToPrint({
    content: () => recipttRef.current,
  });

  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);

    try {
      const response = await axios.get(`/neelain/${values.uniNo}`);
      console.log(JSON.stringify(response?.data));
      setStudent(response.data);
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
  };

  return (
    <Box m="20px" mt="20px">
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
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
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
                  Inquery
                </Button>
              </Box>
            </Box>
          </form>
        )}
      </Formik>
      {student && (
        <Box mt="20px">
          <Card sx={{ maxWidth: 470, textAlign: "right" }}>
            <CardContent ref={recipttRef}>
              <Typography variant="h3">
                الرقم الجامعي : {student.data.universityno}
              </Typography>
              <Typography variant="h3" component="div">
                الاسم : {student.data.name01}
              </Typography>
              <Typography variant="h5">
                المبلغ: {student.data.rem_feez}
              </Typography>
              <Typography variant="body2">
                {(student.data.currency = "1001" ? "SDG" : "USD")} : العملة
                <br />
                رقم الكلية : {student.data.fac}
                <br />
                الفصل الدراسي : {student.data.class_no}
              </Typography>
            </CardContent>
            <CardActions>
              <Box
                display="flex"
                alignItems="baseline"
                justifyContent="space-between"
                width="100%"
              >
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{
                    p: "15px",
                  }}
                  onClick={() =>
                    navigate("pay", {
                      state: {
                        uniNo: student.data.universityno,
                        fees: student.data.rem_feez,
                        curr: student.data.currency,
                        classNo: student.data.class_no,
                      },
                    })
                  }
                >
                  دفع
                </Button>
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{
                    p: "15px",
                  }}
                  onClick={handlePrint}
                >
                  طباعة
                </Button>
              </Box>
            </CardActions>
          </Card>
        </Box>
      )}
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
