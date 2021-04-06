import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios'
import get from 'lodash/get'


// Generate Sales Data
function createData(time, amount) {
  time = reformat(time)
  console.log(`${time} : ${amount}`)
  return { time, amount };
}

function reformat(dateStr) {
  let dArr = dateStr.split("-")
  return dArr[0]+ "/" +dArr[1];
}

// TODO: 1. mock api
const response = 
{
  "USD_CAD": {
      "2021-03-31": 1.25652,
      "2021-04-01": 1.254765,
      "2021-04-02": 1.257735,
      "2021-04-03": 1.257735,
      "2021-04-04": 1.25666,
      "2021-04-05": 1.25185
  },
  "CAD_USD": {
      "2021-03-31": 0.795849,
      "2021-04-01": 0.796962,
      "2021-04-02": 0.79508,
      "2021-04-03": 0.79508,
      "2021-04-04": 0.79576,
      "2021-04-05": 0.798818
  }
}

const getData = (input) => {
  console.log(input)
  for (const time in input) {
    console.log(`${time}: ${input[time]}`);
    data.push(createData(time, input[time]))
  }
  // console.log(data)
}

const data = [
];

export default function Chart() {
  const theme = useTheme();
  // fromCode, toCode

  useEffect(() => {
      handleChange()
      // console.log(data1)
      // setData(data1)
  }, [])
  
  async function handleChange() {
    try {      
        // const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_CAD,CAD_USD&compact=ultra&date=2021-03-31&endDate=2021-04-05&apiKey=eaf0690418fe15dd0f48`)
        // console.log(get(response, ['data', 'CAD_USD']))
        // getData(get(response, ['data', 'CAD_USD']))
        getData(get(response, ['CAD_USD']))
      } catch (error) {
        console.error(error)
      }
  }

  return (
    <React.Fragment>
      <Title>Today</Title>
      <ResponsiveContainer>       
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
           <Label
             angle={270}
             position="left"
             style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
           >
             Currency ($)
           </Label>
         </YAxis>
         <Line type="monotone" dataKey="amount" stroke={theme.palette.primary.main} />
       </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}
