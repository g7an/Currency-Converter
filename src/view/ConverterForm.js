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
import { CURRENCY_SYMBOL, CURRENCY_LIST } from '../constants/data'
import InputAdornment from '@material-ui/core/InputAdornment'
import NumberFormatter from '../services/NumberFormatter'
import clsx from 'clsx'


const useStyles = makeStyles((theme) => ({
    fixedHeight: {
        height: 300,
    },
    formControl: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(3),
      margin: theme.spacing(1),
      minWidth: 120,
    },
    inputField: {
        width: 120,
    },
    root: {
        display: 'flex',
      },
      appBarSpacer: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
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
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
    appBarSpacer: theme.mixins.toolbar,
    button: {
        justifyContent: 'center',
        textAlign:'center'
    },
    form: {
        justifyContent: 'center',
        textAlign:'center'  
    },
    paper: {
        marginTop: theme.spacing(1),
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
      },
  }))


const ConverterForm = () => {
    const classes = useStyles()

    let [symbol, setSymbol] = useState({fromSymbol: "CAD", toSymbol: "USD"})

    let [rate, setRate] = useState(null)

    let [amount, setAmount] = useState(1)

    let [startSymbol, setStartSymbol] = useState("$")

    let [converted, setConverted] = useState(false)

    useEffect(() => {
        if(get(symbol, ['fromSymbol'])) {
            setStartSymbol(CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])).symbol)
        }

        if (converted) {
            handleChange()
        }

    }, [symbol])


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
        setSymbol(prevValues => ({
            ...prevValues,
            [key]: event.target.value
        }))

    }

    function handleInputChange(event) {
        setAmount(parseFloat(event.target.value))
    }

    async function handleChange() {
        setConverted(true)
        try {      
            const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])},${get(symbol, ['toSymbol'])}_${get(symbol, ['fromSymbol'])}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`)
            console.log(response)
            setRate(get(response, ['data']))
          } catch (error) {
            console.error(error)
          }
    }

    return(
        <>
            <Grid container xs={12} className={classes.form}>
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
         
        {symbol && rate && amount ?    
            <Grid item xs={12} className={classes.formControl}>  
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    {amount} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['fromSymbol'])).name} = 
                </Typography>
                <Typography variant="h5" component="h2">
                    {amount * get(rate, [`${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])}`])} {' '} { CURRENCY_SYMBOL.find(item => item.cc === get(symbol, ['toSymbol'])).name }
                </Typography>
            </Grid> :
            <Grid item xs={12} className={classes.button}>  
                <FormControl >
                    <Button className={classes.button} variant="contained" color="primary" onClick={handleChange}>
                        Convert
                    </Button>
                </FormControl>       
            </Grid>
        }
        </Grid> 
       </>
    )
}
export default ConverterForm