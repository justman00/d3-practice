import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PieChart from './components/PieChart'

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/" component={App} />
      <Route path="/messages" component={PieChart} />
    </Switch>
  </Router>,
  document.getElementById('root')
)
