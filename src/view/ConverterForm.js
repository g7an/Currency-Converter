import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { TextField } from '@material-ui/core'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import IconButton from '@material-ui/core/IconButton'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import get from 'lodash/get'
import Grid from '@material-ui/core/Grid'
import { CURRENCY_SYMBOL } from '../constants/data'
import InputAdornment from '@material-ui/core/InputAdornment'
import NumberFormatter from '../services/NumberFormatter'


const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    inputField: {
        width: 100,
    },
    root: {
        minWidth: 275,
    },
    optionField: {
        width: 250,
        fontSize: 14,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
  }))


const ConverterForm = () => {
    const classes = useStyles()

    let [symbol, setSymbol] = useState(null)

    let [rate, setRate] = useState(null)

    let [amount, setAmount] = useState(1)

    let [startSymbol, setStartSymbol] = useState()

    useEffect(() => {

        if(get(symbol, ['fromSymbol'])) {
            setStartSymbol(CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])).symbol)
        }

    }, [symbol])

    let cList = CURRENCY_SYMBOL.map((item, i) => {
		return (
			<option key={i} value={item.cc}>{countryToFlag(item.cc)} {item.cc} - {item.name}</option>
		)
	});

    function countryToFlag(isoCode) {
        return typeof String.fromCodePoint !== 'undefined'
          ? isoCode
              .substring(0, 2)
              .toUpperCase()
              .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
          : isoCode;
      }

    const handleSymbolChange = key => event => {
        // console.log(event.target.value)
        setSymbol(prevValues => ({
            ...prevValues,
            [key]: event.target.value
        }))

    }

    function handleInputChange(event) {
        console.log(event.target.value)
        setAmount(parseFloat(event.target.value))
    }

    async function handleChange() {
        try {      
            const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])},${get(symbol, ['toSymbol'])}_${get(symbol, ['fromSymbol'])}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`)
            console.log(response)
            setRate(get(response, ['data']))
          } catch (error) {
            console.error(error);
          }
    }
    console.log(CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])))


    return(
        <>
         <Grid item xs={12}>
            <FormControl className={classes.formControl}>
                <TextField className={classes.inputField} id="standard-basic" name="amount" 
                    defaultValue="1.00" label="Amount" onChange={handleInputChange} 
                    InputProps={{
                        startAdornment: <InputAdornment position="start">{startSymbol}</InputAdornment>,
                        inputComponent: NumberFormatter,
                      }}
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">From</InputLabel>
                <Select native className={classes.optionField} defaultValue="" id="grouped-native-select" value={get(symbol, ['fromSymbol'])} onChange={handleSymbolChange("fromSymbol")}>
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
                <Select native className={classes.optionField} defaultValue="" 
                        id="grouped-native-select" value={get(symbol, ['toSymbol'])} onChange={handleSymbolChange("toSymbol")}>
                    <option aria-label="None" value="" />
                    {cList}
                </Select>
            </FormControl>
         </Grid> 
        {symbol && rate && amount ?    
            <Grid item xs={12} className={classes.button}>  
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {amount} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])).name} = 
                </Typography>
                <Typography variant="h5" component="h2">
                    {amount * get(rate, [`${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])}`]).toFixed(2)} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['toSymbol'])).name }
                </Typography>
            </Grid> :
            <Grid item xs={12} className={classes.button}>  
                <FormControl className={classes.formControl}>
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleChange}>
                        Convert
                    </Button>
                </FormControl>       
            </Grid> 
    }
       </>
    )
}
export default ConverterForm