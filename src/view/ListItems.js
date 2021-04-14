import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from 'react-router-dom';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz'

const ListItems = () => {
    let history = useHistory()
    // console.log(history)

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