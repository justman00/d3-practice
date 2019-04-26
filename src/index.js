import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PieChart from './components/PieChart'
import Ball from './components/Ball'
import App2 from './components/App2'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/messages" component={PieChart} />
      <Route path="/ball" component={Ball} />
      <Route path="/animated" component={App2} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
