import React from "react";
import Typography from "@material-ui/core/Typography";

const Header = ({ text, variant = "h5", component = "h1" }) => {
  return (
    <Typography variant={variant} component={component}>
      {text}
    </Typography>
  );
};

export default Header;
