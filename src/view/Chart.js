import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer } from 'recharts';
import Title from './Title';
import axios from 'axios'
import get from 'lodash/get'

// Generate Sales Data
function createData(time, amount) {
  return { time, amount };
}

// TODO: 1. fixed data to calling api

// 2021-03-31: 1.25652
// 2021-04-01: 1.254765
// 2021-04-02: 1.257735
// 2021-04-03: 1.257735
// 2021-04-04: 1.25666
// 2021-04-05: 1.25173
const data1 = [
  createData('03-31', 1.25652),
  createData('04-01', 1.254765),
  createData('04-02', 1.257735),
  createData('04-03', 1.257735),
  createData('04-04', 1.25666),
  createData('04-05', 1.25173),
];

export default function Chart() {
  const theme = useTheme();
  // fromCode, toCode
  const [data, setData] = useState(null)

  useEffect(() => {
      handleChange()
      // console.log(data1)
      // setData(data1)
  }, [data])
  
  async function handleChange() {
    try {      
        // const response = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_CAD,CAD_USD&compact=ultra&date=2021-03-31&endDate=2021-04-05&apiKey=eaf0690418fe15dd0f48`)
        // console.log(get(response, ['data', 'USD_CAD'])) 
        // setData(get(response, ['data', 'USD_CAD']))
        setData(data1)
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
