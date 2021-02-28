import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import CurrencyTextField from "../CurrencyTextField";

describe("<CurrencyTextField {...args} />", function () {
  test("renders CurrencyTextField component", async function () {
    const currencies = [
      {
        name: "USD",
        value: "1.5",
        symbol: "$",
        error: {
          isError: false,
          errorText: "",
        },
      },
      {
        name: "EUR",
        value: "2.5",
        symbol: "@",
        error: {
          isError: false,
          errorText: "",
        },
      },
    ];
    let current = currencies[0];
    let handleValueChange = () => {};
    let handleCurrencyChange = () => {};
    let style = {
      classes: {
        formControl: null,
      },
      labelWidth: null,
    };
    const onClick = jest.fn();

    const args = {
      currencies,
      current,
      handleValueChange,
      handleCurrencyChange,
      style,
      onClick,
    };

    render(<CurrencyTextField {...args} />);

    expect(screen.getAllByText("USD")).toHaveLength(2);
    expect(screen.getByText("$")).toBeInTheDocument();
    await userEvent.click(screen.getByRole("button")); /* click on dropdown */
    expect(screen.getAllByText("USD")).toHaveLength(3);

    // await userEvent.click(screen.getAllByRole("option")[1]);

    // expect(onClick).toHaveBeenCalledTimes(1);

    screen.debug();
  });
});
