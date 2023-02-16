import { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Header from "../../components/Header";
import { useLocation } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useEffect } from "react";
import Invoice from "./Invoice";
import useAuth from "../../hooks/useAuth";

const Pay = () => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const location = useLocation();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [tran, data, error, loading, axiosFetch] = useAxiosFunction();
  console.log(location.state);

  const { auth } = useAuth();
  console.log("auth", auth);

  const { uniNo, fees, curr, classNo, name } = location?.state;
  console.log(curr);

  const checkoutSchema = yup.object().shape({
    universityno: yup.string().required("required"),
    currency: yup.string().required("required"),
    class_no: yup.number().required("required"),
    paymentMethod: yup.number().required("required"),
    amount: yup
      .number()
      .min(parseInt(fees) * 0.5)
      .required("incorrect"),
    account: yup.string().when(["paymentMethod"], {
      is: (paymentMethod) => paymentMethod === 20,
      then: yup.string().required("required"),
    }),
    tellerTransRef: yup.string().when(["paymentMethod"], {
      is: (paymentMethod) => paymentMethod === 10,
      then: yup.string().required("required"),
    }),
    chequeDate: yup.string().when(["paymentMethod"], {
      is: (paymentMethod) => paymentMethod === 30,
      then: yup.string().required("required"),
    }),
    chequeCollectRef: yup.string().when(["paymentMethod"], {
      is: (paymentMethod) => paymentMethod === 30,
      then: yup.string().required("required"),
    }),
    chequeNo: yup.string().when(["paymentMethod"], {
      is: (paymentMethod) => paymentMethod === 30,
      then: yup.string().required("required"),
    }),
  });
  const initialValues = {
    universityno: uniNo,
    amount: parseInt(fees),
    currency: curr,
    class_no: classNo,
    paymentMethod: 20,
    account: "",
    tellerTransRef: "",
    chequeDate: "",
    chequeCollectRef: "",
    chequeNo: "",
  };
  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log("vaues", values);
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: "post",
      url: "/trans",
      requestConfig: {
        ...values,

        billerId: "BE-N001",
        channelId: 10,
        billerKey: "NS0001023",
        // branch: "SD0010001",
        branch: auth.bracnh,
      },
    });
    // console.log(tran);
    // if (tran.status !== 201) {
    //   console.log(error);
    //   toast.error(error);
    // }
    // if (tran.status === 201) {
    //   console.log(tran);
    //   toast.success("payed");
    // }
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
                value={values.universityno}
                name="universityno"
                error={!!touched.universityno && !!errors.universityno}
                helperText={touched.universityno && errors.universityno}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                type="number"
                label="Fees"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.amount}
                name="amount"
                error={!!touched.amount && !!errors.amount}
                helperText={touched.amount && errors.amount}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled
                type="text"
                label="Currency"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.currency}
                name="currency"
                error={!!touched.currency && !!errors.currency}
                helperText={touched.currency && errors.currency}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                disabled
                type="number"
                label="Class Number"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.class_no}
                name="class_no"
                error={!!touched.class_no && !!errors.class_no}
                helperText={touched.class_no && errors.class_no}
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
                id="paymentMethod"
                value={values.paymentMethod}
                fullWidth
                label="Payment Method"
                onBlur={handleBlur}
                error={!!touched.paymentMethod && !!errors.paymentMethod}
                name="paymentMethod"
                onChange={handleChange}
              >
                <MenuItem value={10}>Cash</MenuItem>
                <MenuItem value={20}>Transfer</MenuItem>
                <MenuItem value={30}>Check</MenuItem>
              </Select>
            </Box>
            {values.paymentMethod && values.paymentMethod === 10 ? (
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
            ) : values.paymentMethod === 20 ? (
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
            <Box mt="20px" display="flex" justifyContent="space-between">
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
              {data.length !== 0 && (
                <Button
                  color="secondary"
                  size="large"
                  variant="contained"
                  sx={{
                    p: "15px",
                  }}
                  onClick={handleOpen}
                >
                  Recipet
                </Button>
              )}
            </Box>
          </form>
          //  {data.length !== 0 && <Button>Gernrate Invoce</Button>}
        )}
      </Formik>

      {loading && <p>loading...</p>}
      {data.length !== 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent dividers>
            <DialogContentText>
              <Invoice data={data.data} name={name} />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </Box>
  );
};

export default Pay;
