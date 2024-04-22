import MainLayout from "../layout/MainLayout";
import About from "../pages/About";
import Home from "../pages/Home";
import ProductList from "../pages/ProductList";

const mainRoutes = [
  {
    path: "/",
    element: <MainLayout />,
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
    ],
  },
];

export default mainRoutes;
