import React from "react";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@material-ui/icons/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@material-ui/icons/KeyboardArrowLeft";
import { isWidthUp } from "@material-ui/core/withWidth";
import { ConvertButton } from "../../";

const calculateHandler = (base, currencies, setCurrencies) => {
  let from, to, lastSelected;
  if (currencies.from && currencies.to) {
    from = Object.entries(currencies).find((entry) => entry[1].name === base);
    to = Object.entries(currencies).find((entry) => entry[1].name !== base);
  }

  if (from && to) {
    lastSelected = from[0];
    from = from[1];
    to = to[1];

    let inputValue = Number(from.value);
    if (!isNaN(inputValue)) {
      let newValue = inputValue * to[to.name];
      let error = { isError: false, errorText: "" };
      setCurrencies((prev) => ({
        from: {
          ...prev.from,
          value: from.name === prev.from.name ? inputValue : newValue,
          error,
        },
        to: {
          ...prev.to,
          value: from.name === prev.to.name ? inputValue : newValue,
          error,
        },
      }));
    } else {
      let error = {
        isError: true,
        errorText: "value must be a number",
      };
      setCurrencies((prev) => ({
        ...prev,
        [lastSelected]: { ...prev[lastSelected], error },
      }));
    }
  }
};

const updateArrowDirection = (prop, direction, set) => {
  if (prop === "from" && direction !== "right") {
    set("right");
  } else if (prop === "to" && direction !== "left") {
    set("left");
  }
};

const updateBase = (current, _new, set) => {
  if (_new !== current) {
    set(_new); // set base currency, which is the last selected currency
  }
};

const updateValue = (error, value, cb, prop, current) => {
  // if current input has no error, we don't care if there is any in opposite one
  if (!error.isError) {
    cb((prev) => ({
      from: {
        ...prev.from,
        error: {
          isError: false,
          errorText: "",
        },
      },
      to: {
        ...prev.to,
        error: {
          isError: false,
          errorText: "",
        },
      },
      [prop]: { ...current, value, error },
    }));
  } else {
    cb((prev) => ({
      ...prev,
      [prop]: { ...current, value, error },
    }));
  }
};

const updateCurrency = (prop, rates, value, currencies, set) => {
  // swap currencies if currently selected matches the opposite one.
  if (
    (prop === "from" && value === currencies.to.name) ||
    (prop === "to" && value === currencies.from.name)
  ) {
    let tmp = currencies["from"];
    set({ from: currencies["to"], to: tmp });
  } else {
    const newCurrency = rates.find((elem) => elem.name === value);
    set({ ...currencies, [prop]: newCurrency });
  }
};

function getConvertButton(props) {
  let { calculate, arrowDirection, width } = props;

  if (width <= 960) width = "md";

  // default
  let onClick = calculate;
  let color = "primary";
  let icon = <KeyboardArrowDownIcon />;
  let text = "Convert";

  let args = {
    onClick,
    color,
    icon,
    text,
  };

  if (isWidthUp("md", width)) {
    if (arrowDirection === "left") {
      args.color = "secondary";
      args.icon = <KeyboardArrowUpIcon />;
    }
  } else {
    if (arrowDirection === "right") {
      args.icon = <KeyboardArrowRightIcon />;
    } else {
      args.color = "secondary";
      args.icon = <KeyboardArrowLeftIcon />;
    }
  }

  return <ConvertButton {...args} />;
}

export {
  calculateHandler,
  updateArrowDirection,
  updateBase,
  updateValue,
  updateCurrency,
  getConvertButton,
};
