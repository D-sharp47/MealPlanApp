import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    // element: <RootLayout />,
    // children: [
    //   { index: true, element: <HomePage /> },
    //   {
    //     path: "plan",
    //     element: <MealPlan> />,
    //     loader: checkAuthLoader,
    //   },
    // ],
  },
]);

const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
