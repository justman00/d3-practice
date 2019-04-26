import React from 'react'
import * as d3 from 'd3'

function Chart({ data }) {
  const width = 650
  const height = 400
  const [chart, setChart] = React.useState([])
  const [ln, setLn] = React.useState(null)
  const margin = { top: 20, right: 5, bottom: 20, left: 35 }
  const [fns, setFns] = React.useState({})
  const leftAxis = React.useRef(null)
  const bottomAxis = React.useRef(null)

  //console.log(leftAxis)
  //console.log(bottomAxis)

  // axis d3 function
  const xAxis = d3.axisBottom()
  const yAxis = d3.axisLeft()

  React.useEffect(() => {
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

    console.log(line)

    setLn(line(combined))

    const res = combined.map(val => ({
      x: x(new Date(val.date)),
      y: y(val.close),
      height: y(val.low) - y(val.high),
      fill: 'blue'
    }))

    xAxis.scale(x)
    d3.select(bottomAxis.current).call(xAxis)
    yAxis.scale(y)
    d3.select(leftAxis.current).call(yAxis)

    setChart(res)
    setFns({ x, y })
    // finish
  }, [data])

  return (
    <svg width={width} height={height}>
      {ln && <path d={ln} stroke="blue" fill="none" />}
      {/* {chart.map((d, i) => (
        <rect
          key={i}
          width={3}
          fill={d.fill}
          x={d.x}
          y={d.y}
          height={d.height}
        />
      ))} */}

      <g
        ref={bottomAxis}
        transform={`translate(0, ${height - margin.bottom})`}
      />
      <g ref={leftAxis} transform={`translate(${margin.left}, 0)`} />
    </svg>
  )
}

export default Chart
