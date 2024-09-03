import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

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
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
};

export default App;
