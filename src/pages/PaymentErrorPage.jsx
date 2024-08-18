import { Typography } from "@mui/material";
import React from "react";

const PaymentErrorPage = () => {
  return (
    <div
      style={{
        margin: "100px",
        padding: "5rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <Typography variant='h4' sx={{ color: "red" }}>
        Error Processing payment
      </Typography>
      <hr />
      <Typography variant='h5'>
        Sorry!! Your Order has not been placed
      </Typography>
    </div>
  );
};

export default PaymentErrorPage;
