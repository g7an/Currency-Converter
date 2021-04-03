/* eslint-disable no-use-before-define */
import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { makeStyles } from '@material-ui/core/styles'
import { CURRENCY_SYMBOL } from '../../constants/data';
// import Select from '@material-ui/core/Select'

// ISO 3166-1 alpha-2
// ⚠️ No support for IE 11
function countryToFlag(isoCode) {
  return typeof String.fromCodePoint !== 'undefined'
    ? isoCode
        .substring(0, 2)
        .toUpperCase()
        .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
    : isoCode;
}

const useStyles = makeStyles({
  option: {
    fontSize: 15,
    '& > span': {
      marginRight: 10,
      fontSize: 18,
    },
  },
});

const RenderAutoComplete = function({
  label,
  values,
  onChange,
  symbol,
  isSwaped
}) {
  // TODO: pass in props, value, onChange
  const classes = useStyles();
  
  console.log(label) 
  console.log(symbol)
  console.log(isSwaped)

  const [val, setVal] = useState(values)

  const handleClick = value => {
    setVal(value)
  }

  return (
    // TODO: add value={???}, onChange={???}, label={???}
    <Autocomplete
      value={val}
      // defaultValue={"USD"}
      style={{ width: 300 }}
      options={CURRENCY_SYMBOL}
      classes={{
        option: classes.option,
      }}
      onChange={(event, value) => {
        // console.log(event)
        // console.log(value)
        onChange(event)
        handleClick(value)
      }}
      autoHighlight
      getOptionLabel={(option) =>  (`${countryToFlag(option.cc)} ${option.cc} - ${option.name}`)}
      renderOption={(option) => (
        <React.Fragment>
          <span>{countryToFlag(option.cc)}</span>
          {option.cc} - {option.name}
        </React.Fragment>
      )}
      renderInput={(params) => {
        // console.log(params.inputProps)
        return (
          <TextField
            {...params}
            label={label}
            variant="outlined"
            // inputProps={{
            //   ...params.inputProps,
            //   // autoComplete: 'new-password', // disable autocomplete and autofill
            // }}
            // value={values}
            // onChange={(event) => 
            //   onChange(event)
            // }
          />
        )
        
      }}
    />
  );
}
export default RenderAutoComplete