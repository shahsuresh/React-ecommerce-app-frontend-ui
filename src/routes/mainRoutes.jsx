import AuthGuard from "../guard/AuthGuard";
import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import AddProduct from "../pages/AddProduct";
import Cart from "../pages/Cart";
import DatePickerForm from "../pages/DatePickerForm";
import EditProduct from "../pages/EditProduct";
import Home from "../pages/Home";
import Order from "../pages/Order";
import PaymentErrorPage from "../pages/PaymentErrorPage";
import PaymentSuccess from "../pages/PaymentSuccess";
import ProductDetail from "../pages/ProductDetail";
import ProductList from "../pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: (
      <AuthGuard>
        <MainLayout />
      </AuthGuard>
    ),
    children: [
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "products",
        element: <ProductList />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "add-product",
        element: <AddProduct />,
      },
      {
        path: "product-detail/:id",
        element: <ProductDetail />,
      },
      {
        path: "product-edit/:id",
        element: <EditProduct />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "date-picker",
        element: <DatePickerForm />,
      },
      {
        path: "payment-success",
        element: <PaymentSuccess />,
      },
      {
        path: "payment-error",
        element: <PaymentErrorPage />,
      },
      {
        path: "order",
        element: <Order />,
      },
    ],
  },
];

export default mainRoutes;
