import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import useMediaQuery from "@mui/material/useMediaQuery";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../components/Header";
import { Formik } from "formik";
import * as yup from "yup";
import {
  Box,
  Button,
  Card,
  TextField,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import Invoice from "./Invoice";

const PrintRecipt = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [response, data, error, loading, axiosFetch] = useAxiosFunction();
  const [std, stdData, stdError, stdLoading, stdAxiosFetch] =
    useAxiosFunction();
  console.log(data.length);

  const handleFormSubmit = async (values) => {
    // e.preventDefault();
    console.log(values);
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: "get",
      url: `/trans/${values.voucherNo}`,
    });
    if (data && data.length !== 0) {
      fetchStudentDetials(data?.data?.billId);
      console.log(stdData);
    }
  };

  const fetchStudentDetials = async (billId) => {
    console.log(billId);
    await stdAxiosFetch({
      axiosInstance: axiosPrivate,
      method: "get",
      url: `/neelian/${billId}`,
    });
    if (stdData && stdData.length !== 0) {
      console.log(stdData);
      handleOpen();
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);
  useEffect(() => {
    if (data && data.length !== 0) {
      toast.success("Sucess");
      handleOpen();
    }
  }, [data]);
  let datas = {};
  useEffect(() => {}, [stdData]);
  return (
    <div>
      <Box m="20px" mt="20px">
        <ToastContainer />
        <Header title="Recipt" subtitle="Genrate Recipt" />

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
                  label="Voucher number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.voucherNo}
                  name="voucherNo"
                  error={!!touched.voucherNo && !!errors.voucherNo}
                  helperText={touched.voucherNo && errors.voucherNo}
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
      </Box>

      {data.length !== 0 && stdData.length !== 0 && (
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogContent dividers>
            <DialogContentText>
              <Invoice
                name={stdData?.data?.data?.name01}
                data={{
                  uniNo: data?.data?.billId,
                  amount: data?.data?.amt,
                  commission: data?.data?.commission,
                  voucher: data?.data?.voucher,
                  tranDate: data?.data?.createdate,
                  classNo: stdData?.data?.class_no,
                  branch: data?.data?.branch,
                  currency: data?.data?.curr,
                }}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

const checkoutSchema = yup.object().shape({
  voucherNo: yup.string().required("required"),
});

const initialValues = {
  voucherNo: "",
};

export default PrintRecipt;
