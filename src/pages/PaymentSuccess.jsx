import { Button, Typography } from "@mui/material";

import React from "react";
import { Link, useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        margin: "50px",
        padding: "2rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <center>
        <img
          src='/gif/success.gif'
          alt='success'
          style={{ width: "250px", height: "250px" }}
        />
      </center>
      <Typography variant='h3' sx={{ color: "blue" }}>
        Payment Success.
      </Typography>
      <hr />
      <Typography variant='h4'>Thank You for your Order.</Typography>

      <Link to='/order'>
        <Button
          variant='contained'
          color='success'
          fullWidth
          sx={{ marginTop: "3rem", padding: "1rem", fontSize: "1.2rem" }}
        >
          Your Orders
        </Button>
      </Link>
    </div>
  );
};

export default PaymentSuccess;
