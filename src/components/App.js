import React, { Component } from 'react'
import axios from 'axios'
import Chart from './Chart'
import { Link } from 'react-router-dom'

export default class App extends Component {
  state = { data: null, query: '', currentStock: '' }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()
    try {
      const { data } = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${
          this.state.query
        }&apikey=${'YMWPXGKH8NACU5Y3'}`
      )
      this.setState({ data, currentStock: this.state.query, query: '' })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <Link to="/messages">PieChart</Link>
        <Link style={{ display: 'block' }} to="/animated">
          Animated
        </Link>
        <h1>App</h1>
        <p>The api is limited to 5 five calls a minute unfortunately</p>
        <form onSubmit={this.handleSubmit}>
          <input
            placeholder="Enter the tag of a company, e.g AAPL"
            value={this.state.query}
            onChange={this.handleChange}
            name="query"
          />
        </form>
        <h3>{this.state.currentStock}</h3>
        {this.state.data && <Chart data={this.state.data} />}
      </div>
    )
  }
}
