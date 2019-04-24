import React, { Component } from 'react'
import axios from 'axios'
import Chart from './Chart'

export default class App extends Component {
  state = { data: null }

  componentDidMount = async () => {
    try {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=${'YMWPXGKH8NACU5Y3'}`
      )
      console.log(data)
      this.setState({ data })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <h1>App</h1>
        {this.state.data && <Chart data={this.state.data} />}
      </div>
    )
  }
}
