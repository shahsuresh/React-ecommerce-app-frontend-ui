import React from "react";
import HomePageImageSlider from "../components/HomePageImageSlider";
import { Box, Typography } from "@mui/material";
import ProductCard from "../components/ProductCard";
import NewArrivalCard from "../components/NewArrivalCard";
import { useQuery } from "@tanstack/react-query";
import $axios from "../lib/axios/axios.instance";
import Loader from "../components/Loader";

const Home = () => {
  const userRole = localStorage.getItem("role");
  console.log(userRole);
  const { isPending, data } = useQuery({
    queryKey: ["get-new-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: 3,
        limit: 4,
      });
    },
    enabled: userRole === "buyer",
    onError: (error) => {
      // console.log(error.res.message);
    },
  });

  const productList = data?.data?.productList;

  //=====Hot Deals==================
  const { isPending: hotDealsPending, data: hotDealsData } = useQuery({
    queryKey: ["get-hotdeals-products"],
    queryFn: async () => {
      return await $axios.post("/product/list/buyer", {
        page: 1,
        limit: 8,
      });
    },
    enabled: userRole === "buyer",

    onError: (error) => {
      console.log(error.res.message);
    },
  });

  const hotDealsList = hotDealsData?.data?.productList;
  //=================================
  if (isPending) {
    return <Loader />;
  }

  return (
    <>
      <HomePageImageSlider />

      <Typography variant='h3'>New Arrivals</Typography>
      {userRole === "buyer" && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {productList?.map((item) => {
            return <NewArrivalCard key={item._id} {...item} />;
          })}
        </Box>
      )}
      {userRole !== "buyer" && (
        <Typography variant='h4'>
          Buyer can see your latest products here
        </Typography>
      )}

      <Typography variant='h3'>Hot Deals</Typography>
      {userRole === "buyer" && (
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          {hotDealsList?.map((item) => {
            return <NewArrivalCard key={item._id} {...item} />;
          })}
        </Box>
      )}
      {userRole !== "buyer" && (
        <Typography variant='h4'>
          Buyer can see your hot products here
        </Typography>
      )}
    </>
  );
};

export default Home;
