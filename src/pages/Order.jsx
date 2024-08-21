import { useQuery } from "@tanstack/react-query";
import React from "react";
import $axios from "../lib/axios/axios.instance";
import { useDispatch } from "react-redux";
import {
  openErrorSnackbar,
  openSuccessSnackbar,
} from "../store/slices/snackbarSlice";
import Loader from "../components/Loader";
import moment from "moment";
import { Typography } from "@mui/material";

const Order = () => {
  //?====== fetch order details ================
  const dispatch = useDispatch();

  const { isPending, data } = useQuery({
    queryKey: ["get-user-order-detail"],
    queryFn: async () => {
      return await $axios.get(`/order-list`);
    },
    onSuccess: (res) => {
      console.log("RESPONSE", res);
      dispatch(openSuccessSnackbar("Order Fetched"));
      //res?.data?.message
    },
    onError: (error) => {
      dispatch(openErrorSnackbar(error?.data?.message));
      console.log("ERROR");
    },
  });
  if (isPending) {
    return <Loader />;
  }
  console.log("DATA", data?.data?.message);
  const productDetail = data?.data.orderDetails;
  console.log("Product details", productDetail);

  return (
    <>
      <div style={{ marginTop: "2rem" }}>
        <Typography variant='h3'>Order List</Typography>
      </div>
      <div>{!productDetail && <p>{data?.data?.message}</p>}</div>
      <div className='p-4 w-1/2 bg-blue-50'>
        {productDetail.map((item, index) => {
          return (
            <div key={item.userId + index}>
              <p className='font-medium text-lg '>
                {moment(item.createdAt).format("LL")}
              </p>
              <div className='border rounded'>
                <div className='flex flex-col lg:flex-row justify-between'>
                  <div className='grid gap-1'>
                    {item?.productDetails.map((product, index) => {
                      return (
                        <div
                          key={product.productId + index}
                          className='flex  gap-3 bg-slate-100'
                        >
                          <img
                            src={product.image[0]}
                            className='w-28 h-28 bg-slate-200 object-scale-down p-2'
                          />
                          <div>
                            <div className='font-medium text-lg text-ellipsis line-clamp-1'>
                              {product.name}
                            </div>
                            <div className='flex items-center gap-5 mt-1'>
                              <div className='text-lg text-red-500'>
                                Rs.{product.price}
                              </div>
                              <p>Quantity : {product.quantity}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className='flex flex-col gap-4 p-2 min-w-[300px]'>
                    <div>
                      <div className='text-lg font-medium'>
                        Payment Details :{" "}
                      </div>
                      <p className=' ml-1'>
                        Payment method :{" "}
                        {item.paymentDetails.payment_method_type[0]}
                      </p>
                      <p className=' ml-1'>
                        Payment Status : {item.paymentDetails.payment_status}
                      </p>
                    </div>
                  </div>
                </div>

                <div className='font-semibold ml-auto w-fit lg:text-lg'>
                  Total Amount : {item.totalAmount}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Order;
