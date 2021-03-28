import React, { useEffect } from 'react'
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
    const classes = useStyles();

    const axios = require('axios');
    
    useEffect(() => {
        // const query = {q: 'USD_PHP', compact: 'ultra', apiKey: `${process.env.API_KEY}`}
        getUser()
    })

    async function getUser() {
        try {
          const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_PHP&compact=ultra&apiKey=${process.env.REACT_APP_API_KEY}`)
          console.log(response);
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
                <Select native defaultValue="" id="grouped-native-select">
                <option aria-label="None" value="" />
                {/* <optgroup label="Category 1"> */}
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                {/* </optgroup> */}
                {/* <optgroup label="Category 2"> */}
                    <option value={3}>Option 3</option>
                    <option value={4}>Option 4</option>
                {/* </optgroup> */}
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
                <Select native defaultValue="" id="grouped-native-select">
                <option aria-label="None" value="" />
                {/* <optgroup label="Category 1"> */}
                    <option value={1}>Option 1</option>
                    <option value={2}>Option 2</option>
                {/* </optgroup> */}
                {/* <optgroup label="Category 2"> */}
                    <option value={3}>Option 3</option>
                    <option value={4}>Option 4</option>
                {/* </optgroup> */}
                </Select>
            </FormControl>
       </>
    )
}
export default ConverterForm




//  <FormControl className={classes.formControl}>
//         <InputLabel htmlFor="grouped-native-select">Grouping</InputLabel>
//         <Select native defaultValue="" id="grouped-native-select">
//           <option aria-label="None" value="" />
//           <optgroup label="Category 1">
//             <option value={1}>Option 1</option>
//             <option value={2}>Option 2</option>
//           </optgroup>
//           <optgroup label="Category 2">
//             <option value={3}>Option 3</option>
//             <option value={4}>Option 4</option>
//           </optgroup>
//         </Select>
//       </FormControl>