import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import { tokens } from "../../theme";
import PrintIcon from "@mui/icons-material/Print";

import {
  Box,
  Dialog,
  DialogContent,
  DialogContentText,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import Invoice from "../neelian/Invoice";

const Trans = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const [reciptData, setReciptData] = useState({});
  const [response, data, error, loading, axiosFetch] = useAxiosFunction();
  const [std, stdData, stdError, stdLoading, stdAxiosFetch] =
    useAxiosFunction();

  const columns = [
    { field: "id", headerName: "ID", width: 30, sortable: false },
    { field: "billId", headerName: "Bill ID", width: 200 },
    { field: "amt", headerName: "Amount", width: 70 },
    {
      field: "commission",
      headerName: "Commission",
      width: 70,
    },
    {
      field: "curr",
      headerName: "Currency",
      width: 100,
    },
    {
      field: "voucher",
      headerName: "Voucher",
      width: 200,
    },
    {
      field: "branch",
      headerName: "Branch",
      width: 200,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 200,
    },
    {
      field: "createdate",
      headerName: "Date",
      width: 200,
      valueFormatter: (params) =>
        moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    {
      field: "status",
      headerName: "Status",
      width: 200,
    },
    {
      field: "tellerTransRef",
      headerName: "Tellr Ref",
      width: 200,
    },
    {
      field: "account",
      headerName: "Account",
      width: 200,
    },
    {
      field: "chequeDate",
      headerName: "Cheque Date",
      width: 200,
    },
    {
      field: "chequeCollectRef",
      headerName: "Cheque Ref",
      width: 200,
    },
    {
      field: "chequeNo",
      headerName: "Cheque NO",
      width: 200,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 50,
      renderCell: (params) => {
        return (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
            }}
          >
            <Box
              style={{
                padding: "2px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "black",
              }}
              onClick={(e) => hanlePrint(params.row)}
            >
              <PrintIcon />
            </Box>
          </div>
        );
      },
    },
  ];
  //   const rows = [];

  const hanlePrint = async (value) => {
    setReciptData({});
    console.log(value);
    fetchStudentDetials(value.billId);
    setReciptData(value);
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

  const fetcTrans = async () => {
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: "get",
      url: `/trans`,
    });
    if (data.length > 0) {
      console.log(data?.data);
    }
  };

  useEffect(() => {
    fetcTrans();
    console.log(data?.data);
  }, []);

  useEffect(() => {
    if (stdData && stdData?.data) {
      toast.success("Sucess");
      handleOpen();
    }
  }, [stdData]);

  return (
    <div>
      <Box m="20px" mt="20px">
        <ToastContainer />
        <Header title="Transactions" subtitle="Transactions list" />
        <Box
          m="40px 0 0 0"
          height="75vh"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              outline: "none !important",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
              outline: "none !important",
            },
            "& .name-column--cell": {
              outline: "none !important",
            },
            "& .MuiDataGrid-columnHeaders": {
              borderBottom: "none",
              outline: "none !important",
            },
            "& .MuiDataGrid-virtualScroller": {
              outline: "none !important",
            },
            "& .MuiDataGrid-footerContainer": {
              borderTop: "none",

              outline: "none !important",
            },
            "& .MuiCheckbox-root": {
              color: `${colors.greenAccent[200]} !important`,
              outline: "none !important",
            },
          }}
        >
          {data?.data ? (
            <DataGrid
              sx={{ border: "none", outline: "none" }}
              loading={loading}
              autoHeight
              rows={data?.data}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              //   checkboxSelection
            />
          ) : null}
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
                    uniNo: reciptData?.billId,
                    amount: reciptData?.amt,
                    commission: reciptData?.commission,
                    voucher: reciptData?.voucher,
                    tranDate: reciptData?.createdate,
                    classNo: stdData?.data?.class_no,
                    branch: reciptData?.branch,
                    currency: reciptData?.curr,
                  }}
                />
              </DialogContentText>
            </DialogContent>
          </Dialog>
        )}
      </Box>
    </div>
  );
};

export default Trans;
