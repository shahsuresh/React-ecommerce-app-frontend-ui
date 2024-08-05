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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginLeft: 0,
          color: "white",
        }}
        gap={2}
      >
        <Typography variant='h5'>We Accept</Typography>
        <img src='Khalti.png' height={"45px"} width={"55px"} />
        <img src='esewa.png' height={"45px"} width={"55px"} />
        <img
          src='imepay.png'
          height={"45px"}
          width={"55px"}
          style={{ backgroundColor: "white" }}
        />
        <img
          src='connect-ips.png'
          height={"45px"}
          width={"55px"}
          style={{ backgroundColor: "white" }}
        />
      </Box>

      <Typography variant='h5' sx={{ color: "#fff", marginLeft: "140px" }}>
        © 2020 Copyright: Nepal Electronic Mart
      </Typography>
      <Box
        sx={{
          color: "white",
          display: "flex",
          flexDirection: "row",
          float: "right",
          marginLeft: "200px",
          justifyContent: "center",
          alignItems: "center",
        }}
        gap={2}
      >
        <Typography variant='h5'>Find Us On:</Typography>
        <img src='facebook.png' height={"35px"} width={"35px"} />
        <img src='instagram.png' height={"35px"} width={"35px"} />
        <img src='twitter.png' height={"35px"} width={"35px"} />
      </Box>
    </Box>
  );
};

export default Footer;
