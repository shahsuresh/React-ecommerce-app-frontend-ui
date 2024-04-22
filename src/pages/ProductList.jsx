import React from "react";
import SellerProductList from "../components/SellerProductList";
import BuyerProductList from "../components/BuyerProductList";

const ProductList = () => {
  const userRole = localStorage.getItem("role");

  return (
    <>{userRole === "seller" ? <SellerProductList /> : <BuyerProductList />}</>
  );
};

export default ProductList;
