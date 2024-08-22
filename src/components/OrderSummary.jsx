import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import React from "react";

const OrderSummary = ({ orderSummary, cartData }) => {
  const userName = localStorage.getItem("firstName");
  //?============function for handling stripe payment===============
  const makeStripePayment = async () => {
    // console.log("stripe payments");
    const stripe = await loadStripe(
      "pk_test_51Pp3VHHFlDC49Jg5QMb4k5olNpgVhbpAPRusBVcn73J6xRJSMDwtTW0Wv2DSWZSxt0mbx7sNkLd9QBOssgKAMphb00aaIBe5W7"
    );
    const body = { products: cartData };

    const headers = { "Content-Type": "application/json" };
    const response = await fetch("http://localhost:5000/stripe-pay", {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    });
    // console.log("Response is", response);
    const session = await response.json();
    // console.log("SESSION FRONTEND", session);
    const result = stripe.redirectToCheckout({ sessionId: session.id });
    // console.log("RESULT", result);
  };

  //?======function for handling khalti payment on button Click=====
  const handleKhalti = async () => {
    console.log("khalti payment");

    const payload = {
      return_url: "http://localhost:5173/payment-success",
      website_url: "http://localhost:5173/",
      amount: parseInt(orderSummary.grandTotal) * 100,
      purchase_order_id: "test12",
      purchase_order_name: "test",
      customer_info: {
        name: userName,
        email: "example@gmail.com",
        phone: "9800000123",
      },
    };
    const response = await axios.post("http://localhost:5000/khalti-api");
    console.log(response);
    if (response) {
      window.location.href = `${response?.data?.data?.payment_url}`;
    }
  };
  //================================================================
  return (
    <Box sx={{ width: "30%" }}>
      <TableContainer
        component={Paper}
        sx={{
          boxShadow:
            "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
          <Typography variant='h6'>Order Summary</Typography>
        </Toolbar>
        <Table
          sx={{
            width: "300px",
          }}
        >
          <TableBody>
            <TableRow>
              <TableCell>
                <Typography>Sub total</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.allProductSubTotal}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Discount</Typography>
              </TableCell>
              <TableCell>
                <Typography>Rs. {orderSummary?.discountAmount}</Typography>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>
                <Typography>Grand total</Typography>
              </TableCell>
              <TableCell>
                <Typography sx={{ fontWeight: "bold" }}>
                  Rs. {orderSummary?.grandTotal}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button
          variant='contained'
          color='success'
          fullWidth
          sx={{ borderRadius: 0 }}
          onClick={makeStripePayment}
        >
          Pay Rs. {orderSummary?.grandTotal}
        </Button>
      </TableContainer>
    </Box>
  );
};

export default OrderSummary;
