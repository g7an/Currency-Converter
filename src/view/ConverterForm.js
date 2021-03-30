import React, { useEffect, useState } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { makeStyles } from '@material-ui/core/styles'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import { TextField } from '@material-ui/core'
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'
import IconButton from '@material-ui/core/IconButton'
import axios from 'axios'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
  }));


const ConverterForm = () => {
    const classes = useStyles()

    const axios = require('axios')

    const currencyCode = require('currency-codes')

    let currencyList = currencyCode.codes()

    let [fromCode, setFromCode] = useState('')

    let [toCode, setToCode] = useState('')

    
    
    useEffect(() => {
        getUser()
    })


    let cList = currencyList.length > 0
		&& currencyList.map((item, i) => {
		return (
			<option key={i} value={item}>{item}</option>
		)
	}, this);

    function handleFromChange(event) {
        console.log(event.target.value)
        setFromCode(event.target.value)
    }

    function handleToChange(event) {
        console.log(event.target.value)
        setToCode(event.target.value)
    }

    

    async function getUser() {
        try {
          const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${fromCode}_${toCode}&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`)
          console.log(response)
        } catch (error) {
          console.error(error);
        }
      }

    return(
        <>
            <FormControl className={classes.formControl}>
                <TextField id="standard-basic" defaultValue="1" label="Amount" />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">From</InputLabel>
                <Select native defaultValue="" id="grouped-native-select" onChange={handleFromChange}>
                <option aria-label="None" value="" /> 
                 {cList}
                </Select>
            </FormControl>
            <FormControl className={classes.formControl}>
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload picture" component="span">
                        <SwapHorizIcon />
                    </IconButton>
                </label>
            </FormControl>
            <FormControl className={classes.formControl}>
                <TextField id="standard-basic" defaultValue="1" label="Amount" />
            </FormControl>
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="grouped-native-select">To</InputLabel>
                <Select native defaultValue="" id="grouped-native-select" onChange={handleToChange}>
                <option aria-label="None" value="" />
                {cList}
                </Select>
            </FormControl>
       </>
    )
}
export default ConverterForm