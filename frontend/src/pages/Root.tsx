import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import TemporaryDrawer from "../components/Dashboard";

const RootLayout: React.FC = () => {
  const [dashboardOpen, setDashboardOpen] = React.useState(false);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header setDashboardOpen={setDashboardOpen} />
      <TemporaryDrawer
        dashboardOpen={dashboardOpen}
        setDashboardOpen={setDashboardOpen}
      />
      <Outlet />
    </div>
  );
};

export default RootLayout;
