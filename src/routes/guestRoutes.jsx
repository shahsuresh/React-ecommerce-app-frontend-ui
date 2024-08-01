import GuestGuard from "../guard/GuestGuard";
import MinimumLayout from "../layout/MinimumLayout";
import Login from "../pages/Login";
import Register from "../pages/Register";

const guestRoutes = [
  {
    path: "/",
    element: (
      <GuestGuard>
        <MinimumLayout />
      </GuestGuard>
    ),
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
];

export default guestRoutes;
