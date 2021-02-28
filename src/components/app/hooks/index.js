import React from "react";
// import currencySymbols from "../../../data/currencySymbols.json";

/**
 * @author 109149
 * @time Wed 24 Feb 2021 16:13:05 +04
 *
 * {Hook} Handles window size change. Adds and removes event listener on window.
 *
 * @param {String} initialState is width of window.
 * @returns {Number} width that is the width of resized window.
 */
const useWindowResize = (initialState = window.innerWidth) => {
  const [width, setWidth] = React.useState(initialState);

  React.useEffect(() => {
    function handleWidthChange(event) {
      setWidth(event.target.outerWidth);
    }

    window.addEventListener("resize", handleWidthChange);
    return () => window.removeEventListener("resize", handleWidthChange);
  }, []);

  return width;
};

/**
 * @author 109149
 * @time Wed 24 Feb 2021 16:09:42 +04
 *
 * {Hook} Handles dark mode toggling.
 *
 * @param {String} initialValue is one of the following "dark" or "light"
 * @returns tuple [state, dispatch]
 */
const useTheme = (initialValue = "dark") => {
  return React.useReducer((state) => {
    let newTheme = state === "dark" ? "light" : "dark";
    localStorage.setItem("theme-type", newTheme);
    return newTheme;
  }, initialValue);
};

export { useTheme, useWindowResize };
