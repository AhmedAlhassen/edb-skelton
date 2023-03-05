import React, { useState, useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import { DataGrid } from "@mui/x-data-grid";
import { ToastContainer, toast } from "react-toastify";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import { axiosPrivate } from "../../api/axios";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { tokens } from "../../theme";

const Users = () => {
  const [response, postData, error, loading, axiosFetch] = useAxiosFunction();
  const [fetch, userData, userError, userLoading, userAxiosFetch] =
    useAxiosFunction();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),

    role: yup.number().required("required"),
    bracnh: yup.string().required("required"),
  });

  const [initialValues, setInitialValues] = useState({
    username: "",
    role: 3,
    bracnh: "",
  });
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);
  const [edit, setEdit] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  const columns = [
    { field: "id", headerName: "ID", width: 70, sortable: false },
    { field: "username", headerName: "User Name", width: 230 },
    { field: "role", headerName: "Role", width: 200 },
    { field: "bracnh", headerName: "Branch", width: 200 },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
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
              style={{ padding: "2px", borderRadius: "5px", cursor: "pointer" }}
              onClick={(e) => console.log(e, params.row)}
            >
              <VisibilityOutlinedIcon />
            </Box>
            <Box
              style={{
                padding: "2px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "blue",
              }}
              onClick={(e) => handleEdit(params.row)}
            >
              <ModeEditOutlineOutlinedIcon />
            </Box>
            <Box
              style={{
                padding: "2px",
                borderRadius: "5px",
                cursor: "pointer",
                color: "red",
                // fontSize: "24px",
              }}
              onClick={(e) => console.log(e, params.row)}
            >
              <DeleteOutlinedIcon />
            </Box>
          </div>
        );
      },
    },
  ];

  const rols = [
    { id: 1, name: "admin" },
    { id: 2, name: "user" },
  ];

  const handleEdit = async (valuse) => {
    setEdit(true);
    setOpen(true);
    console.log(valuse);
    setInitialValues({
      id: valuse.id,
      username: valuse.username,
      bracnh: valuse.bracnh,
      role: valuse.role === "admin" ? 1 : 3,
    });
    console.log(initialValues);
  };

  const handleFormSubmit = async (values) => {
    // e.preventDefault();

    console.log(values);
    await axiosFetch({
      axiosInstance: axiosPrivate,
      method: edit ? "patch" : "post",
      url: edit ? `/user/${initialValues.id}` : `/user`,
      requestConfig: {
        ...values,
        bracnh: values.bracnh,
        password: "edb@123",
      },
    });
  };
  const fetchUsers = async () => {
    await userAxiosFetch({
      axiosInstance: axiosPrivate,
      method: "get",
      url: `/user`,
    });
    if (userData.length > 0) {
      console.log(userData.data);
    }
  };

  useEffect(() => {
    console.log("sta");
    fetchUsers();
  }, []);
  useEffect(() => {
    // console.log("ttt", userData.data);
    if (userData) {
      const row = [];
      userData?.data?.map((value) => {
        console.log(value);
        row.push({
          id: value.id,
          username: value.username,
          bracnh: value.bracnh,
          role: value.role.name,
        });
        setRows(row);
      });
      console.log(rows);
    }
  }, [userData]);

  useEffect(() => {
    if (postData && postData.length !== 0) {
      toast.success("Sucess");
      console.log(postData);
      setOpen(false);

      fetchUsers();
    }
  }, [postData]);
  useEffect(() => {
    if (error) {
      toast.error(error.statusText);
    }
  }, [error]);

  return (
    <div>
      <Box m="20px" mt="20px">
        <ToastContainer />
        <Header title="Users" subtitle="User detials" />

        <div
          style={{
            display: "flex",
            justifyContent: "start",
            marginBottom: "5px",
          }}
        >
          <Button
            variant="contained"
            color="secondary"
            size="small"
            sx={{
              p: "15px",
              height: "40px",
              width: "40px",
              borderRadius: "80px",
            }}
            onClick={() => {
              setOpen(true);
              setInitialValues({
                username: "",
                role: 3,
                bracnh: "",
              });
            }}
          >
            <AddOutlinedIcon />
          </Button>
        </div>

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
          <DataGrid
            sx={{ border: "none", outline: "none" }}
            loading={loading}
            autoHeight
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            //   checkboxSelection
          />
        </Box>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          sx={{ width: "100%" }}
        >
          <DialogTitle id="responsive-dialog-title">
            {edit ? "Edit user" : "Add user"}
          </DialogTitle>
          <DialogContent>
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
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ gridColumn: "span 2" }}
                    />

                    <Box>
                      <Select
                        id="role"
                        value={values.role}
                        fullWidth
                        label="Role"
                        onBlur={handleBlur}
                        error={!!touched.role && !!errors.role}
                        name="role"
                        onChange={handleChange}
                        sx={{ gridColumn: "span 4" }}
                      >
                        <MenuItem value={1}>Admin</MenuItem>
                        <MenuItem value={3}>User</MenuItem>
                      </Select>
                    </Box>
                    <TextField
                      fullWidth
                      type="text"
                      label="bracnh"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.bracnh}
                      name="bracnh"
                      error={!!touched.bracnh && !!errors.bracnh}
                      helperText={touched.bracnh && errors.bracnh}
                      sx={{ gridColumn: "span 2" }}
                    />
                  </Box>
                  <Box sx={{ gridColumn: "span 2", mt: "10px" }}>
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
                        "Save"
                      )}
                    </Button>
                  </Box>
                </form>
              )}
            </Formik>
          </DialogContent>
        </Dialog>
        {/* {userData && <p>{JSON.stringify(userData.data)}</p>} */}
      </Box>
    </div>
  );
};

export default Users;
