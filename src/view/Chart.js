import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios'
import get from 'lodash/get'
import SelectFields from './SelectFields'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import {getCurrentDate} from '../services/helper'


const useStyles = makeStyles((theme) => ({
  form: {
    marginBottom: theme.spacing(4),
    justifyContent: 'center',
    textAlign:'center'  
},
}))

// Generate Sales Data
function createData(time, amount) {
  time = reformat(time)
  console.log(`${time} : ${amount}`)
  return { time, amount };
}

function reformat(dateStr) {
  let dArr = dateStr.split("-")
  return dArr[1]+ "/" +dArr[2];
}


let dataTemp = [];

export default function Chart() {
  const theme = useTheme();
  const classes = useStyles()
  let [symbol, setSymbol] = useState({fromSymbol: "CAD", toSymbol: "USD"})
  let [data, setData] = useState()

  const getData = (input) => {
    console.log(input)
    for (const time in input) {
      // console.log(`${time}: ${input[time]}`);
      dataTemp.push(createData(time, input[time]))
    }
    setData(dataTemp)
    dataTemp = []
  }

  // const getCurrentDate = (offset) => {
  //   let newDate = new Date()
  //   let date = newDate.getDate() - offset;
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();
    
  //   return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
  // }

  useEffect(() => {
      handleChange()
  }, [symbol])
  
  async function handleChange() {
    try {      
      //  TODO: do not call api again if swap
        const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=${get(symbol, 
        ['fromSymbol'])}_${get(symbol, ['toSymbol'])},${get(symbol, ['toSymbol'])}_${get(symbol, 
        ['fromSymbol'])}&compact=ultra&date=${getCurrentDate(7)}&endDate=${getCurrentDate(0)}&apiKey=eaf0690418fe15dd0f48`)
        console.log(get(response, ['data', `${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])}`]))
        getData(get(response, ['data', `${get(symbol, ['fromSymbol'])}_${get(symbol, ['toSymbol'])}`]))
        
      } catch (error) {
        console.error(error)
      }
  }
  console.log(symbol)
  console.log(data)

  return (
    <React.Fragment>
      <Title>Currency trend in last 7 days</Title>
      <Grid className={classes.form}>
        <SelectFields symbol={symbol} onSymbolChange={setSymbol}/>       
      </Grid>
      {data && <ResponsiveContainer>       
         <LineChart
         data={data}
         margin={{
           top: 16,
           right: 16,
           bottom: 0,
           left: 24,
         }}
       >
         <XAxis dataKey="time" stroke={theme.palette.text.secondary} />
         <YAxis stroke={theme.palette.text.secondary} domain={['dataMin', 'dataMax']}>
         </YAxis>
         <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} />
       </LineChart>
      </ResponsiveContainer>     
      }
      
    </React.Fragment>
  );
}
