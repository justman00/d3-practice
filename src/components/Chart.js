import React from 'react'
import * as d3 from 'd3'

function Chart({ data }) {
  const width = 650
  const height = 400
  const [chart, setChart] = React.useState([])

  console.log(data)

  React.useEffect(() => {
    // parsing all the data
    const days = Object.keys(data['Time Series (Daily)'])
    const values = Object.values(data['Time Series (Daily)'])
    const combined = values.map((v, i) => ({
      ...v,
      low: parseFloat(v['3. low']),
      high: parseFloat(v['2. high']),
      date: days[i] + 'T00:00'
    }))

    // extents
    const [minTime, maxTime] = d3.extent(combined, d => d.date)
    const [min, max] = d3.extent(combined, d => d.high)
    const atl = d3.min(combined, d => d.low)

    // scales
    const x = d3
      .scaleTime()
      .domain([new Date(minTime), new Date(maxTime)])
      .range([0, width])

    const y = d3
      .scaleLinear()
      .domain([atl, max])
      .range([height, 0])

    console.log(y(combined[99].high))

    // almost spitting out all the d3 data
    const res = combined.map(val => ({
      x: x(new Date(val.date)),
      y: y(val.high),
      height: y(val.low) - y(val.high),
      fill: 'blue'
    }))

    setChart(res)

    // finish
  }, [data])

  return (
    <svg width={width} height={height}>
      {chart.map((d, i) => (
        <rect
          key={i}
          width={3}
          fill={d.fill}
          x={d.x}
          y={d.y}
          height={d.height}
        />
      ))}
    </svg>
  )
}

export default Chart
