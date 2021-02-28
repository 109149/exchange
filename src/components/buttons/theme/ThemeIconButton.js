import React from "react";
import IconButton from "@material-ui/core/IconButton";
import Brightness5Icon from "@material-ui/icons/Brightness5"; // sun
import Brightness4Icon from "@material-ui/icons/Brightness4"; // moon

const ThemeIconButton = ({ isDark, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      {isDark ? <Brightness5Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};

export default ThemeIconButton;
