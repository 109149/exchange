import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";

const SplashScreen = () => {
  return (
    <Grid
      container
      justify="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item>
        <CircularProgress />
      </Grid>
    </Grid>
  );
};

export default SplashScreen;
