import React, { useEffect, useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
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
import MuiDatatable from "./MuiDatatable";

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
    { accessorKey: "id", header: "ID", size: 20 },
    {
      accessorKey: "billId",
      header: "Bill ID",
      size: 100,
      enableClickToCopy: true,
    },
    { accessorKey: "amt", header: "Amount", size: 70, enableClickToCopy: true },
    {
      accessorKey: "commission",
      header: "Commission",
      size: 70,
    },
    {
      accessorKey: "curr",
      header: "Currency",
      size: 100,
      enableClickToCopy: true,
    },
    {
      accessorKey: "voucher",
      header: "Voucher",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "branch",
      header: "Branch",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "createdBy",
      header: "Created By",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "createdate",
      header: "Date",
      size: 200,
      accessorFn: (row) => moment(row.createdate).format("DD/MM/YYYY hh:mm A"),
      // valueFormatter: (params) =>
      //   moment(params?.value).format("DD/MM/YYYY hh:mm A"),
      enableClickToCopy: true,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "tellerTransRef",
      header: "Tellr Ref",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "account",
      header: "Account",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "chequeDate",
      header: "Cheque Date",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "chequeCollectRef",
      header: "Cheque Ref",
      size: 200,
      enableClickToCopy: true,
    },
    {
      accessorKey: "chequeNo",
      header: "Cheque NO",
      size: 200,
      enableClickToCopy: true,
    },
    // {
    //   accessorKey: "actions",
    //   header: "Actions",
    //   size: 50,
    //   renderCell: (params) => {
    //     return (
    //       <div
    //         style={{
    //           display: "flex",
    //           justifyContent: "space-between",
    //           size: "80%",
    //         }}
    //       >
    //         <Box
    //           style={{
    //             padding: "2px",
    //             borderRadius: "5px",
    //             cursor: "pointer",
    //             color: "black",
    //           }}
    //           onClick={(e) => hanlePrint(params.row)}
    //         >
    //           <PrintIcon />
    //         </Box>
    //       </div>
    //     );
    //   },
    // },
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
      <Box m="20px">
        <ToastContainer />
        <Header title="Transactions" subtitle="Transactions list" />
        <Box m="40px 0 0 0" height="75vh">
          {data?.data ? (
            <MuiDatatable
              col={columns}
              data={data?.data}
              hanlePrint={hanlePrint}
            />
          ) : null}
        </Box>
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
                  classNo: stdData?.data?.data?.class_no,
                  branch: reciptData?.branch,
                  currency: reciptData?.curr,
                }}
              />
            </DialogContentText>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Trans;
