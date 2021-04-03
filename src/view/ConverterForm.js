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
import RenderAutoComplete from './utils/RenderAutoComplete'


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

    let [swap, setSwap] = useState(false)

    useEffect(() => {
        
    }, [swap])

    const handleSymbolChange = (key) => event => {
        console.log(event.target.value)
        if (event.target.value) {
            setSymbol(prevValues => ({
                ...prevValues,
                [key]: event.target.value.toUpperCase()
            }))
        }
       
        // console.log(`${get(symbol, ['fromSymbol'])}`)
        // console.log(CURRENCY_SYMBOL.find(item => item.cc === 'USD').name
    }

    function handleInputChange(event) {
        console.log(event.target.value)
        setAmount(event.target.value)
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


    return(
        <>
         <Grid item xs={12}>
            <FormControl className={classes.formControl}>
                <TextField className={classes.inputField} id="standard-basic" name="amount" defaultValue="1" label="Amount" onChange={handleInputChange} />
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <InputLabel htmlFor="grouped-native-select">From</InputLabel> */}

                 <RenderAutoComplete label="From" values={get(symbol, ['fromSymbol'])} onChange={handleSymbolChange("fromSymbol")} symbol={get(symbol, ['fromSymbol'])} isSwaped={swap} />
                {/* <Select native className={classes.optionField} defaultValue="" id="grouped-native-select" value={get(symbol, ['fromSymbol'])} onChange={handleSymbolChange("fromSymbol")}>
                <option aria-label="None" value="" /> 
                {cList}
                </Select> */}
            </FormControl>
            <FormControl className={classes.formControl}>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span" onClick={() => {
                        handleSymbolChange("toSymbol", get(symbol, ['fromSymbol'])) ({ target: {value: get(symbol, ['fromSymbol']) } })
                        handleSymbolChange("fromSymbol", get(symbol, ['toSymbol'])) ({ target: {value: get(symbol, ['toSymbol']) } })
                        setSwap(true)
                    }}>
                        <SwapHorizIcon />
                    </IconButton>
                </label>
            </FormControl>
            <FormControl className={classes.formControl}>
                {/* <RenderAutoComplete label="To" value={get(symbol, ['toSymbol'])} onChange={(event, value) => {
                    if(value) {
                        console.log(value.cc)
                        setSymbol(prevValues => ({
                            ...prevValues,
                            toSymbol: value.cc? value.cc: event.target.value
                        }))
                    }   
                }} /> */}
               <RenderAutoComplete label="To" values={get(symbol, ['toSymbol'])} onChange={handleSymbolChange("toSymbol")} symbol={get(symbol, ['toSymbol'])} isSwaped={swap} />
                {/* <InputLabel htmlFor="grouped-native-select">To</InputLabel>
                <Select native className={classes.optionField} defaultValue="" 
                        id="grouped-native-select" value={get(symbol, ['toSymbol'])} onChange={handleSymbolChange("toSymbol")}>
                    <option aria-label="None" value="" />
                    {cList}
                </Select> */}
            </FormControl>
         </Grid> 
         <Grid item xs={12} className={classes.button}>  
            <FormControl className={classes.formControl}>
                <Button className={classes.button} variant="contained" color="primary" onClick={handleChange}>
                    Convert
                </Button>
            </FormControl>       
        </Grid>
        {symbol && rate && amount &&  
        <Grid item xs={12} className={classes.button}>  
            <Typography className={classes.title} color="textSecondary" gutterBottom>
                {amount} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])).name} = 
            </Typography>
            <Typography variant="h5" component="h2">
                {amount * get(rate, [`${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])}`])} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['toSymbol'])).name }
            </Typography>
        </Grid>
}
       </>
    )
}
export default ConverterForm