import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { CurrencyTextField, ThemeIconButton, Header, SplashScreen } from "../";
import Grid from "@material-ui/core/Grid";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import {
  calculateHandler,
  updateArrowDirection,
  updateBase,
  updateValue,
  updateCurrency,
  getConvertButton,
} from "./logic";
import { useTheme, useWindowResize } from "./hooks";
import "./App.css";

import currencySymbols from "../../data/currencySymbols.json";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  margin: {
    margin: theme.spacing(1),
  },
  widthoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: (props) => props.width,
  },
  gridItem: {
    textAlign: "center",
    justify: "center",
  },
}));

function App() {
  const [themeType, setThemeType] = useTheme(
    localStorage.getItem("theme-type") ?? "dark"
  );
  const theme = React.useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: themeType,
        },
      }),
    [themeType]
  );

  const width = useWindowResize();
  const classes = useStyles({ width: "30ch" });
  const [arrowDirection, setArrowDirection] = React.useState("right");
  const [base, setBase] = React.useState("CAD");
  const [fx, setFx] = React.useState({});
  const [currencies, setCurrencies] = React.useState({
    from: {},
    to: {},
  });

  React.useEffect(() => {
    const getFlag = (country) =>
      `https://www.countryflags.io/${country}/flat/32.png`;
    const getSymbol = (currency) => currencySymbols[currency].symbol;
    const getRates = (base) =>
      `https://api.exchangeratesapi.io/latest?base=${base}`;

    let dateNow = new Date()
      .toLocaleDateString()
      .split("/")
      .reverse()
      .join("-");
    fetch(getRates(base))
      .then((response) => response.json())
      .then((data) => {
        /* rates, base, date, error */
        const currencies = data.rates;
        const resultRates = [];
        for (const [currency, rate] of Object.entries(currencies)) {
          let country = currency.slice(0, 2);
          resultRates.push({
            [currency]: rate,
            name: currency,
            flag: getFlag(country),
            value: "",
            symbol: getSymbol(currency),
            error: {
              isError: false,
              errorText: "",
            },
            country,
          });
        }
        resultRates
          .filter((rate) => rate.name !== "EUR") // Idk what's wrong with EUR
          .sort((a, b) => a.name.localeCompare(b.name));

        setFx((prev) => ({
          // ...prev,
          rates: resultRates,
          date: dateNow,
          base,
        }));

        // console.log("setting");
        setCurrencies((prev) => {
          if (prev.from.name && prev.to.name) {
            return {
              from: {
                ...resultRates.find((rate) => rate.name === prev.from.name),
                value: prev.from.value,
                error: prev.from.error,
              },
              to: {
                ...resultRates.find((rate) => rate.name === prev.to.name),
                value: prev.to.value,
                error: prev.to.error,
              },
            };
          }
          return {
            from: resultRates[0],
            to: resultRates[1],
          };
        });

        // console.log("fetched length", resultRates.length);
      })
      .catch((err) => console.error(err));
  }, [base]);

  const calculate = (event) => {
    calculateHandler(base, currencies, setCurrencies);
  };

  const handleLastSelected = (prop) => (event) => {
    let newBase = event.target.id.split("-")[0];

    updateArrowDirection(prop, arrowDirection, setArrowDirection);
    updateBase(fx.base, newBase, setBase);
  };

  const handleValueChange = (prop) => (event) => {
    const current = currencies[prop];
    const value = Number(event.target.value);
    let _error = current.error;

    // eslint-disable-next-line no-self-compare
    if (value !== value || !value) {
      // test against NaN && undefined && null
      _error.isError = true;
      _error.errorText = "value must be a number";
    } else {
      _error.isError = false;
      _error.errorText = "";
    }

    updateValue(_error, event.target.value, setCurrencies, prop, current);
  };

  const handleCurrencyChange = (prop) => (event) => {
    updateCurrency(
      prop,
      fx.rates,
      event.target.value,
      currencies,
      setCurrencies
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {fx.rates &&
      Object.keys(currencies.from).length > 0 &&
      Object.keys(currencies.to).length > 0 ? (
        <div className={classes.root}>
          <Grid
            container
            justify="center"
            alignItems="center"
            style={{ minHeight: "30vh" }}
          >
            <Grid item xs={12}>
              <ThemeIconButton
                onClick={setThemeType}
                isDark={themeType === "dark"}
              />
            </Grid>
            <Grid item xs={12} className={classes.gridItem}>
              <Header text="Exchange" />
            </Grid>
            <Grid item xs={12} sm={12} md={5} className={classes.gridItem}>
              <CurrencyTextField
                className={classes.gridItem}
                onClick={handleLastSelected("from")}
                currencies={fx.rates}
                current={currencies.from}
                handleValueChange={handleValueChange("from")}
                handleCurrencyChange={handleCurrencyChange("from")}
                style={{
                  labelWidth: 55,
                  classes: {
                    formControl: classes.margin,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={2} className={classes.gridItem}>
              {getConvertButton({
                arrowDirection,
                calculate,
                width,
              })}
            </Grid>
            <Grid item xs={12} sm={12} md={5} className={classes.gridItem}>
              <CurrencyTextField
                className={classes.gridItem}
                onClick={handleLastSelected("to")}
                currencies={fx.rates}
                current={currencies.to}
                handleValueChange={handleValueChange("to")}
                handleCurrencyChange={handleCurrencyChange("to")}
                style={{
                  labelWidth: 55,
                  classes: {
                    formControl: classes.margin,
                  },
                }}
              />
            </Grid>
          </Grid>
        </div>
      ) : (
        <SplashScreen />
      )}
    </ThemeProvider>
  );
}

export default App;
