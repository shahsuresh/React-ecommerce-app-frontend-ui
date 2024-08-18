import { Typography } from "@mui/material";

import React from "react";

const PaymentSuccess = () => {
  return (
    <div
      style={{
        margin: "100px",
        padding: "5rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Typography variant='h3' sx={{ color: "blue" }}>
        Payment Success.
      </Typography>
      <hr />
      <Typography variant='h4'>Thank You for your Order.</Typography>
    </div>
  );
};

export default PaymentSuccess;
