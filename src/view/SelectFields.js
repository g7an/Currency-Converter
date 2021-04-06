import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import IconButton from '@material-ui/core/IconButton'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import { CURRENCY_SYMBOL } from '../constants/data'


const useStyles = makeStyles((theme) => ({
    formControl: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
      margin: theme.spacing(1),
      minWidth: 120,
    },
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    optionField: {
        width: 250,
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    button: {
        justifyContent: 'center',
        textAlign:'center'
    },
    form: {
        justifyContent: 'center',
        textAlign:'center'  
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
  }))


const SelectFields = ({symbol, onSymbolChange}) => {
    const classes = useStyles()

    let cList = CURRENCY_SYMBOL.map((item, i) => {
		return (
			<option key={i} value={item.cc}>{countryToFlag(item.cc)} {item.cc} - {item.name}</option>
		)
	})

    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
          ? isoCode
              .substring(0, 2)
              .toUpperCase()
              .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
          : isoCode
      }

    const handleSymbolChange = key => event => {

        onSymbolChange(prevValues => ({
            ...prevValues,
            [key]: event.target.value
        }))

    }


    return(
        <>
            <Grid container xs={12} className={classes.form}>
                <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">From</InputLabel>
                <Select native className={classes.optionField} defaultValue="CAD" id="grouped-native-select" value={get(symbol, ['fromSymbol'])} onChange={handleSymbolChange("fromSymbol")}>
                <option aria-label="None" value="" /> 
                {cList}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                        handleSymbolChange("toSymbol") ({ target: {value: get(symbol, ['fromSymbol']) } })
                        handleSymbolChange("fromSymbol") ({ target: {value: get(symbol, ['toSymbol']) } })
                    }}>
                        <SwapHorizIcon />
                    </IconButton>
                </label>
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">To</InputLabel>
                <Select native className={classes.optionField} defaultValue="USD" 
                        id="grouped-native-select" value={get(symbol, ['toSymbol'])} onChange={handleSymbolChange("toSymbol")}>
                    <option aria-label="None" value="" />
                    {cList}
                </Select>
            </FormControl>
        </Grid>  
       </>
    )
}
export default SelectFields