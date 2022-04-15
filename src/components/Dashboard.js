import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

import ApplicationBar from "./ApplicationBar";
import ApplicationDrawer from "./ApplicationDrawer";
import ApplicationContent from "./ApplicationContent";

function DashboardContent() {
  const [open, setOpen] = React.useState(false);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <ApplicationBar open={open} toggleDrawer={toggleDrawer} />
      <ApplicationDrawer open={open} toggleDrawer={toggleDrawer} />
      <ApplicationContent />
    </Box>
  );
}

export default function Dashboard() {
  return <DashboardContent />;
}
