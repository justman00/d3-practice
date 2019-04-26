import React from 'react'
import { Link } from 'react-router-dom'
import * as d3 from 'd3'
import Slice from './Slice'
import BarChart from './BarChart'

const data = [
  {
    answered: true
  },
  {
    answered: false
  },
  {
    answered: false
  },
  {
    answered: true
  },
  {
    answered: false
  },
  {
    answered: true
  },
  {
    answered: false
  },
  {
    answered: true
  },
  {
    answered: true
  },
  {
    answered: false
  },
  {
    answered: true
  },
  {
    answered: true
  },
  {
    answered: true
  },
  {
    answered: true
  },
  {
    answered: true
  },
  {
    answered: true
  }
]

function PieChart() {
  const width = 500
  const height = 500
  const answered = data.filter(val => val.answered).length
  const pie = d3.pie()([answered, data.length - answered])

  console.log(pie)

  return (
    <div>
      <Link to="/">Stock Analysis</Link>
      <Link style={{ display: 'block' }} to="/animated">
        Animated
      </Link>
      <h1>PieChart</h1>
      <div>
        <div style={{ width: '25px', height: '25px', background: '#DC143C' }} />
        <span>Not answered</span>
      </div>
      <div>
        <div style={{ width: '25px', height: '25px', background: '#32CD32' }} />
        <span>Answered</span>
      </div>
      <svg width={width} height={height}>
        <g transform={`translate(${width / 2}, ${height / 2})`}>
          <Slice pie={pie} />
        </g>
      </svg>
      <BarChart />
    </div>
  )
}

export default PieChart
