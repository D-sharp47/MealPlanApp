import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const RootLayout: React.FC = () => {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <Outlet />
    </div>
  );
};

export default RootLayout;
