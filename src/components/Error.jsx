import React, { Fragment, useEffect } from "react";
import ErrorIcon from "@mui/icons-material/Error";
import { CardContent, Typography, Card } from "@mui/material";
import { setSelectedDrawerItem } from "../reducers/selectedDrawerItemSlice";
import { useDispatch } from "react-redux";

function Error({ text1, text2 }) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setSelectedDrawerItem(100));
  }, []);
  return (
    <Fragment>
      <Card
        sx={{
          height: "82vh",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          display: "flex",
          p: 5,
        }}
      >
        <CardContent>
          <ErrorIcon color="primary" style={{ fontSize: 320 }} />
          <Typography variant="h4"> {text1}</Typography>
          <Typography variant="h6" sx={{ mt: 3 }}>
            {text2}
          </Typography>
        </CardContent>
      </Card>
    </Fragment>
  );
}

export default Error;
