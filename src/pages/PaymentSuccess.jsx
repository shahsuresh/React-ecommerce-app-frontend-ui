import { Typography } from "@mui/material";
import React from "react";

const PaymentSuccess = () => {
  return (
    <div style={{ margin: "100px" }}>
      <Typography variant='h3'>
        Payment Successfull
        <hr />
        Thank You for your Order.
      </Typography>
    </div>
  );
};

export default PaymentSuccess;
