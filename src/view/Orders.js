import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import get from 'lodash/get'
import axios from 'axios'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { red, green } from '@material-ui/core/colors';
import {getCurrentDate} from '../services/helper'
import CircularProgress from '@material-ui/core/CircularProgress'

// Generate Order Data
function createData(index, cPair, rate, change) {
  return { index, cPair, rate, change };
}

const rows = []

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));


// EUR_USD (euro/US dollar)
// USD_JPY (US dollar/Japanese yen)
// GBP_USD (British pound/US dollar)
// AUD_USD (Australian dollar/US dollar)
// USD_CAD (US dollar/Canadian dollar)
// USD_CNY (US dollar/Chinese renminbi)
export default function Orders() {
  const classes = useStyles();
  const [data, setData] = useState();
  const [table, setTable] = useState();

  useEffect(() => {
    handleData()    
  }, [rows, table])


  useEffect(() => {
    console.log(data)
    // console.log(table)
    if(!table || table.length == 0) {
      processData()
    }
  }, [data])

  const compareRate = (rate1, rate2) => {
    console.log(rate1, rate2)
    return rate1 >= rate2 ? rate1 === rate2? '-': 
        <ArrowDropDownIcon style={{ color: red[500] }}/>: 
        <ArrowDropUpIcon style={{ color: green[500] }}/>
  }


  async function handleData() {
    try {      
      //  due to the pair limitation of free api (only 2 pairs can be called each time), api will be called 3 times
        const res1 = await axios.get(`https://free.currconv.com/api/v7/convert?q=EUR_USD,USD_JPY&compact=ultra&date=${getCurrentDate(2)}&endDate=${getCurrentDate(1)}&apiKey=eaf0690418fe15dd0f48`)
        const res2 = await axios.get(`https://free.currconv.com/api/v7/convert?q=GBP_USD,AUD_USD&compact=ultra&date=${getCurrentDate(2)}&endDate=${getCurrentDate(1)}&apiKey=eaf0690418fe15dd0f48`)
        const res3 = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_CAD,USD_CNY&compact=ultra&date=${getCurrentDate(2)}&endDate=${getCurrentDate(1)}&apiKey=eaf0690418fe15dd0f48`)
      setData(prevValues => ({
        ...prevValues,
        'EUR / USD': get(res1, ['data', 'EUR_USD']),
        'USD / JPY': get(res1, ['data', 'USD_JPY']),
        'GBP / USD': get(res2, ['data', 'GBP_USD']),
        'AUD / USD': get(res2, ['data', 'AUD_USD']),
        'USD / CAD': get(res3, ['data', 'USD_CAD']),
        'USD / CNY': get(res3, ['data', 'USD_CNY']),
      }))
      } catch (error) {
        console.error(error)
      }
  }

  const RenderLoading = () => (
    <TableBody>
      <TableRow>
        <TableCell />
        <TableCell>
          <CircularProgress />
        </TableCell>
        <TableCell />
      </TableRow>
    </TableBody>
  )

  const processData = () => {
    let count = 1
    for (let cPair in data) {
      let changeSign = compareRate(get(data[cPair], [getCurrentDate(2)]), get(data[cPair], [getCurrentDate(1)]))
      rows.push(createData(count, cPair, get(data[cPair], [getCurrentDate(1)]), changeSign))
      count++
    }
    setTable(rows)
  }
  
  return (
    <React.Fragment>
      <Title>Live Currency</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Currency</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Change</TableCell>
          </TableRow>
        </TableHead>
        {table && table.length > 0 ?
        <TableBody>
          {table && table.length > 0 && table.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cPair}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.change}</TableCell>
            </TableRow>
          )) }
        </TableBody>
        :
          RenderLoading()
          }
      </Table>
    </React.Fragment>
  );
}
