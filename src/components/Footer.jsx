import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#c94d6e",
        height: "60px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        left: 0,
        bottom: 0,
        
        width: "100%",
        
      }}
        
        
    >
      <Typography variant="h5" sx={{ color: "#fff" }}>
        © 2020 Copyright: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footer;
