import { useState, useEffect } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Neelian from "./scenes/neelian";
import Pay from "./scenes/neelian/pay";
import Root from "./scenes/neelian/Root";
import SignIn from "./scenes/auth";
import Layout from "./components/global/Layout";
import RequireAuth from "./components/global/RequireAuth";
import useAxiosFunction from "./hooks/useAxiosFunction";
import Invoice from "./scenes/neelian/Invoice";
import ChangePassword from "./scenes/settings/ChangePassword";
import Users from "./scenes/users/Index";
import PrintRecipt from "./scenes/neelian/PrintRecipt";
import Trans from "./scenes/trans/Index";

const ROLES = {
  Admin: "admin",
  User: "user",
};

function App() {
  const [theme, colorMode] = useMode();
  const [Login, data, error, loading, axiosFetch] = useAxiosFunction();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Routes>
          <Route path="invoce" element={<Invoice />} />
          <Route path="/" element={<Layout />}>
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="/users" element={<Users />}></Route>
            </Route>
            <Route
              element={<RequireAuth allowedRoles={[ROLES.Admin, ROLES.User]} />}
            >
              <Route path="/" element={<Dashboard />} />
              <Route path="/" element={<Root />}>
                <Route path="neelian" element={<Neelian />} />
                <Route path="neelian/pay" element={<Pay />} />
                <Route path="neelian/invoce" element={<Invoice />} />
                <Route path="trans" element={<Trans />} />
                <Route path="neelian/reprint" element={<PrintRecipt />} />
              </Route>
              <Route path="/changepassword" element={<ChangePassword />} />
            </Route>
          </Route>

          <Route path="/login" element={<SignIn />} />
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
