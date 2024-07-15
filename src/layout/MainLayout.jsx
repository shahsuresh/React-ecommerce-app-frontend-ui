import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Box } from "@mui/material";
import CustomSnackbar from "../components/CustomSnackbar";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          margin: "3rem 0",
        }}
      >
        <Outlet />
      </Box>

      <Footer />
      <CustomSnackbar />
    </>
  );
};

export default MainLayout;
