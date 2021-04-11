import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import get from 'lodash/get'
import axios from 'axios'
import { bindActionCreators } from 'redux';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
import { red, green } from '@material-ui/core/colors';

// Generate Order Data
function createData(index, cPair, rate, change) {
  return { index, cPair, rate, change };
}

const rows = [
  createData('USD_CNY', '7.123', 'low'),
  createData('USD_CNY', '7.123', 'low'),
  createData('USD_CNY', '7.123', 'low'),
  createData('USD_CNY', '7.123', 'low'),
];

const rowsTemp = []

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
    if(!data) {
      handleData()
    }
    if(!table) {
      processData()
    }
    
  }, [data])

  useEffect(() => {
    console.log(data)
    console.log(table)
    if(!table || table.length == 0) {
      processData()
    }
  }, [table])

  // useEffect(() => {
  //   setTable(rowsTemp)
  // })

  const compareRate = (rate1, rate2) => {
    return rate1 >= rate2 ? rate1 === rate2? '-': <ArrowDropDownIcon style={{ color: red[500] }}/>: <ArrowDropUpIcon style={{ color: green[500] }}/>
  }


  async function handleData() {
    try {      
      //  due to the pair limitation of free api (only 2 pairs can be called each time), api will be called 3 times
        // const res1 = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_EUR,USD_JPY&compact=ultra&date=2021-04-08&endDate=2021-04-09&apiKey=eaf0690418fe15dd0f48`)
        // const res2 = await axios.get(`https://free.currconv.com/api/v7/convert?q=GBP_USD,AUD_USD&compact=ultra&date=2021-04-08&endDate=2021-04-09&apiKey=eaf0690418fe15dd0f48`)
        // const res3 = await axios.get(`https://free.currconv.com/api/v7/convert?q=USD_CAD,USD_CNY&compact=ultra&date=2021-04-08&endDate=2021-04-09&apiKey=eaf0690418fe15dd0f48`)
      const res1 = {
          "USD_EUR": {
              "2021-04-08": 0.839102,
              "2021-04-09": 0.840336
          },
          "USD_JPY": {
              "2021-04-08": 109.328505,
              "2021-04-09": 109.66204
          }
      }
      const res2 = {
        "GBP_USD": {
            "2021-04-08": 1.373343,
            "2021-04-09": 1.37085
        },
        "AUD_USD": {
            "2021-04-08": 0.765685,
            "2021-04-09": 0.7622
        }
      }
      const res3 = {
        "USD_CAD": {
            "2021-04-08": 1.256365,
            "2021-04-09": 1.253035
        },
        "USD_CNY": {
            "2021-04-08": 6.551097,
            "2021-04-09": 6.553041
        }
      }
      // console.log(res1)
      // console.log(compareRate(get(res1, ['USD_EUR', '2021-04-08']), get(res2, ['USD_EUR', '2021-04-09'])))
      setData(prevValues => ({
        ...prevValues,
        'USD_EUR': get(res1, ['USD_EUR']),
        'USD_JPY': get(res1, ['USD_JPY']),
        'GBP_USD': get(res2, ['GBP_USD']),
        'AUD_USD': get(res2, ['AUD_USD']),
        'USD_CAD': get(res3, ['USD_CAD']),
        'USD_CNY': get(res3, ['USD_CNY']),
      }))
      } catch (error) {
        console.error(error)
      }
  }

  const processData = () => {
    let count = 1
    for (let cPair in data) {
      console.log(`${cPair}: ${get(data[cPair], ['2021-04-09'])}`)
      let changeSign = compareRate(get(data[cPair], ['2021-04-08']), get(data[cPair], ['2021-04-09']))
      rowsTemp.push(createData(count, cPair, get(data[cPair], ['2021-04-09']), changeSign))
      // rowsTemp.push(createData('USD_CNY', '7.123', 'low'))
      count++
    }
    setTable(rowsTemp)
    // for (const time in input) {
    //   // console.log(`${time}: ${input[time]}`);
    //   data.push(createData(time, input[time]))
    // }
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
        <TableBody>
          {/* {rowsTemp && rowsTemp.length > 0 && rowsTemp.map((row) => ( */}
          {table && table.length > 0 && table.map((row) => (
            // {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.cPair}</TableCell>
              <TableCell>{row.rate}</TableCell>
              <TableCell>{row.change}</TableCell>
              {/* <TableCell>{row.paymentMethod}</TableCell>
              <TableCell align="right">{row.amount}</TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Link color="primary" href="#" onClick={preventDefault}>
          See more orders
        </Link>
      </div>
    </React.Fragment>
  );
}
