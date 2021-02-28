import React from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputLabel from "@material-ui/core/InputLabel";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import "./CurrencyTextField.css";
// import PropTypes from "prop-types";

const CurrencyTextField = (props) => {
  const {
    currencies,
    current,
    handleValueChange,
    handleCurrencyChange,
    style,
    onClick,
  } = props;
  const { classes, labelWidth } = style;
  const { formControl } = classes;
  const { name, value, symbol } = current;
  const { errorText, isError } = current.error;

  return (
    <FormControl className={formControl} variant="outlined">
      <InputLabel htmlFor={`${name}-currency-value`}>{name}</InputLabel>
      <OutlinedInput
        id={`${name}-currency-value`}
        value={value}
        className="textField"
        onChange={(event) => {
          handleValueChange(event);
          onClick(event);
        }}
        error={isError}
        endAdornment={
          <InputAdornment position="end">
            <TextField
              id={`${name}-select`}
              select
              value={name}
              onChange={handleCurrencyChange}
              className="selectField"
            >
              {currencies.map((currency) => {
                return (
                  <MenuItem
                    id={`${currency.name}-select-as-new-${name}`}
                    key={currency.name}
                    value={currency.name}
                  >
                    <div className="selectFieldText">
                      <Grid container alignItems="center" justify="center">
                        <Grid item>
                          <img
                            className="flagImage"
                            src={currency.flag}
                            alt={`${currency.name}-flag`}
                          />
                        </Grid>
                        <Grid item>{currency.name}</Grid>
                      </Grid>
                    </div>
                  </MenuItem>
                );
              })}
            </TextField>
          </InputAdornment>
        }
        startAdornment={
          <InputAdornment position="start">{symbol}</InputAdornment>
        }
        labelWidth={labelWidth || 55}
      />
      <FormHelperText id={`${name}-helper-text`}>{errorText}</FormHelperText>
    </FormControl>
  );
};

// const _c = PropTypes.shape({
//   name: PropTypes.string,
//   flag: PropTypes.string,
//   symbol: PropTypes.string,
//   value: PropTypes.string,
//   error: PropTypes.shape({
//     isError: PropTypes.bool,
//     errorText: PropTypes.string,
//   }),
// });

// CurrencyTextField.propTypes = {
//   currencies: PropTypes.arrayOf(_c),
//   current: _c,
//   handleValueChange: PropTypes.func,
//   handleCurrencyChange: PropTypes.func,
//   onClick: PropTypes.func,
//   style: PropTypes.object,
// };

export default CurrencyTextField;
