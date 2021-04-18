import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BarChartIcon from '@material-ui/icons/BarChart';
import { useHistory } from 'react-router-dom';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'

const ListItems = () => {
    let history = useHistory()

    return (
        <div>
          <ListItem button onClick={() => history.push('/')} >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="DashBoard" />
          </ListItem>
          <ListItem button onClick={() => history.push('/converter')}>
            <ListItemIcon>
              <SwapHorizIcon />
            </ListItemIcon>
            <ListItemText primary="Converter" />
          </ListItem>
        </div>
      )      
} 

export default ListItems