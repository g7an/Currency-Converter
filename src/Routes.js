import React from "react"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import ConverterForm from "./view/ConverterForm"
import Bars from './view/Bars'

import Typography from '@material-ui/core/Typography'
import DashBoard from "./view/DashBoard"


export default function Routes() {
  return (
    <Router>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/" component={DashBoard} exact />
            {/* <Dashboard /> */}
          {/* </Route> */}
          <Route path="/converter" component={ConverterForm} />
            {/* <ConverterForm />
          </Route> */}
        </Switch>
    </Router>
  )
}

