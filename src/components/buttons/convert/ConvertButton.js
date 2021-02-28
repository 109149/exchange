import React from "react";
import Button from "@material-ui/core/Button";

const ConvertButton = (props) => {
  const {
    onClick,
    color,
    icon,
    text,
    variant = "contained",
    size = "large",
  } = props;

  return (
    <Button
      onClick={onClick}
      variant={variant}
      color={color}
      size={size}
      startIcon={icon}
    >
      {text}
    </Button>
  );
};

export default ConvertButton;
