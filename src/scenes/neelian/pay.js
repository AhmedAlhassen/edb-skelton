import React from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";

const Pay = () => {
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const { uniNo, fees, curr, classNo } = location.state;

  const checkoutSchema = yup.object().shape({
    uniNo: yup.string().required("required"),
    curr: yup.string().required("required"),
    classNo: yup.number().required("required"),
    paymentM: yup.number().required("required"),
    fees: yup
      .number()
      .min(parseInt(fees) * 0.5)
      .required("incorrect"),
    account: yup.string().when(["paymentM"], {
      is: (paymentM) => paymentM === 20,
      then: yup.string().required("required"),
    }),
    tellerTransRef: yup.string().when(["paymentM"], {
      is: (paymentM) => paymentM === 10,
      then: yup.string().required("required"),
    }),
    chequeDate: yup.string().when(["paymentM"], {
      is: (paymentM) => paymentM === 30,
      then: yup.string().required("required"),
    }),
    chequeCollectRef: yup.string().when(["paymentM"], {
      is: (paymentM) => paymentM === 30,
      then: yup.string().required("required"),
    }),
    chequeNo: yup.string().when(["paymentM"], {
      is: (paymentM) => paymentM === 30,
      then: yup.string().required("required"),
    }),
  });
  const initialValues = {
    uniNo: uniNo,
    fees: parseInt(fees),
    curr: curr === "SDG" ? "1001" : "1002",
    classNo: classNo,
    paymentM: 20,
    account: "",
    tellerTransRef: "",
    chequeDate: "",
    chequeCollectRef: "",
    chequeNo: "",
  };
  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
  };

  return (
    <Box m="20px" mt="20px">
      <Header title="Pay" subtitle="Pay Student Fees" />
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
                disabled
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
              <TextField
                fullWidth
                type="number"
                label="Fees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.fees}
                name="fees"
                error={!!touched.fees && !!errors.fees}
                helperText={touched.fees && errors.fees}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled
                type="text"
                label="Currency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.curr}
                name="curr"
                error={!!touched.curr && !!errors.curr}
                helperText={touched.curr && errors.curr}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled
                type="number"
                label="Class Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.classNo}
                name="classNo"
                error={!!touched.classNo && !!errors.classNo}
                helperText={touched.classNo && errors.classNo}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>

            <Typography mt="20px" variant="h5">
              Payment method
            </Typography>
            <Box mt="20px">
              <InputLabel id="payment-method">Payment Method</InputLabel>
              <Select
                labelId="payment-method"
                id="paymentM"
                value={values.paymentM}
                fullWidth
                label="Payment Method"
                onBlur={handleBlur}
                error={!!touched.paymentM && !!errors.paymentM}
                name="paymentM"
                onChange={handleChange}
              >
                <MenuItem value={10}>Cash</MenuItem>
                <MenuItem value={20}>Transfer</MenuItem>
                <MenuItem value={30}>Check</MenuItem>
              </Select>
            </Box>
            {values.paymentM && values.paymentM === 10 ? (
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                mt="20px"
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Teller Trans Ref"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.tellerTransRef}
                  name="tellerTransRef"
                  error={!!touched.tellerTransRef && !!errors.tellerTransRef}
                  helperText={touched.tellerTransRef && errors.tellerTransRef}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
            ) : values.paymentM === 20 ? (
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                mt="20px"
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Account"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.account}
                  name="account"
                  error={!!touched.account && !!errors.account}
                  helperText={touched.account && errors.account}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
            ) : (
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
                mt="20px"
              >
                <TextField
                  fullWidth
                  type="text"
                  label="Cheque Date"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chequeDate}
                  name="chequeDate"
                  error={!!touched.chequeDate && !!errors.chequeDate}
                  helperText={touched.chequeDate && errors.chequeDate}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Cheque Collect Ref"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chequeCollectRef}
                  name="chequeCollectRef"
                  error={
                    !!touched.chequeCollectRef && !!errors.chequeCollectRef
                  }
                  helperText={
                    touched.chequeCollectRef && errors.chequeCollectRef
                  }
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  type="text"
                  label="Teller Trans Ref"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.chequeNo}
                  name="chequeNo"
                  error={!!touched.chequeNo && !!errors.chequeNo}
                  helperText={touched.chequeNo && errors.chequeNo}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
            )}
            <Box mt="20px" display="flex" justifyContent="start">
              <Button
                type="submit"
                color="secondary"
                size="large"
                variant="contained"
                sx={{
                  p: "15px",
                }}
              >
                Pay
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default Pay;
