import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Topbar from "./components/global/Topbar";
import Sidebar from "./components/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Neelian from "./scenes/neelian";
import Pay from "./scenes/neelian/pay";
import Root from "./scenes/neelian/Root";
import SignIn from "./scenes/auth";
import Layout from "./components/global/Layout";
import RequireAuth from "./components/global/RequireAuth";
import useAxiosFunction from "./hooks/useAxiosFunction";
import { axiosPrivate } from "./api/axios";

const ROLES = {
  Admin: "admin",
};

function App() {
  const [theme, colorMode] = useMode();
  const [Login, data, error, loading, axiosFetch] = useAxiosFunction();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route path="/" element={<Root />}>
              <Route path="neelian" element={<Neelian />} />
              <Route path="neelian/pay" element={<Pay />} />
            </Route>
          </Route>

          <Route path="/login" element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
