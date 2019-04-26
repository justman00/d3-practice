import React, { Component } from 'react'
import axios from 'axios'
import Chart2 from './Chart2'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'

export default class App extends Component {
  state = { d: null, data: null, query: '', currentStock: '' }

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

      const width = 650
      const height = 400
      const margin = { top: 20, right: 5, bottom: 20, left: 35 }

      // parsing all the data
      const days = Object.keys(data['Time Series (Daily)'])
      const values = Object.values(data['Time Series (Daily)'])
      const combined = values.map((v, i) => ({
        ...v,
        low: parseFloat(v['3. low']),
        high: parseFloat(v['2. high']),
        date: days[i] + 'T00:00',
        close: parseFloat(v['4. close'])
      }))

      // extents
      const [minTime, maxTime] = d3.extent(combined, d => d.date)
      const [min, max] = d3.extent(combined, d => d.high)
      const atl = d3.min(combined, d => d.low)

      // console.log(atl, min)

      // scales
      const x = d3
        .scaleTime()
        .domain([new Date(minTime), new Date(maxTime)])
        .range([margin.left, width - margin.right])

      const y = d3
        .scaleLinear()
        .domain([atl - 10, max])
        .range([height - margin.bottom, margin.top])

      // almost spitting out all the d3 data
      const line = d3
        .line()
        .x(d => x(new Date(d.date)))
        .y(d => y(d.close))
        .curve(d3.curveCatmullRom)

      // console.log(line(combined))

      this.setState({
        data,
        currentStock: this.state.query,
        query: '',
        d: line(combined)
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <div>
        <Link to="/messages">PieChart</Link>
        <Link style={{ display: 'block' }} to="/">
          Stock Analysis
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
        {this.state.d && <Chart2 d={this.state.d} />}
      </div>
    )
  }
}
