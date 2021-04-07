import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios'
import get from 'lodash/get'
import SelectFields from './SelectFields'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'

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

// TODO: 1. mock api
// const response = 
// {
//   "USD_CAD": {
//       "2021-03-31": 1.25652,
//       "2021-04-01": 1.254765,
//       "2021-04-02": 1.257735,
//       "2021-04-03": 1.257735,
//       "2021-04-04": 1.25666,
//       "2021-04-05": 1.25185
//   },
//   "CAD_USD": {
//       "2021-03-31": 0.795849,
//       "2021-04-01": 0.796962,
//       "2021-04-02": 0.79508,
//       "2021-04-03": 0.79508,
//       "2021-04-04": 0.79576,
//       "2021-04-05": 0.798818
//   },
//   "CHF_CNY": {
//     "2021-03-31": 6.941092,
//     "2021-04-01": 6.968339,
//     "2021-04-02": 6.966924,
//     "2021-04-03": 6.966924,
//     "2021-04-04": 6.96991,
//     "2021-04-05": 7.015389
// },
// }



let dataTemp = [
];

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

  const getCurrentDate = (offset) => {
    let newDate = new Date()
    let date = newDate.getDate() - offset;
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    
    return `${year}-${month<10?`0${month}`:`${month}`}-${date<10?`0${date}`:`${date}`}`
  }

  useEffect(() => {
      handleChange()
  }, [symbol])
  
  async function handleChange() {
    try {      
      //  TODO: 1. change dates, 2. do not call api again if swap
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
  console.log(getCurrentDate(7))

  return (
    <React.Fragment>
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
