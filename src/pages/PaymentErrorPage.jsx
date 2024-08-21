import { Button, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PaymentErrorPage = () => {
  return (
    <div
      style={{
        margin: "50px",
        padding: "2rem",
        boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
      }}
    >
      <center>
        {" "}
        <img
          src='/gif/error.gif '
          alt='error'
          style={{ width: "200px", height: "200px" }}
        />
      </center>
      <Typography variant='h4' sx={{ color: "red" }}>
        Error Processing payment
      </Typography>
      <hr />
      <Typography variant='h5'>
        Sorry!! Your Order has not been placed
      </Typography>
      <Link to='/cart'>
        <Button
          variant='contained'
          color='error'
          fullWidth
          sx={{ marginTop: "3rem", padding: "1rem", fontSize: "1.2rem" }}
        >
          Goto Cart Page
        </Button>
      </Link>
    </div>
  );
};

export default PaymentErrorPage;
