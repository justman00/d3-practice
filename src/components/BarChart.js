import React from 'react'
import * as d3 from 'd3'

const data = [255, 476, 123, 255, 89, 320]

function BarChart() {
  const [els, setEls] = React.useState([])
  const height = 800
  const xWidth = 100
  const leftAxisRef = React.useRef(null)

  const yAxis = d3.axisLeft()

  React.useEffect(() => {
    const valExtent = d3.extent(data, d => d)

    const xScale = d3
      .scaleLinear()
      .domain([])
      .range([])

    const yScale = d3
      .scaleLinear()
      .domain([0, valExtent[1]])
      .range([height, 0])

    console.log(yScale(data[4]))

    const res = data.map((el, i) => {
      // console.log(yScale(el))
      return {
        x: i * xWidth + 50,
        y: yScale(el),
        height: height - yScale(el),
        fill: 'blue'
      }
    })

    setEls(res)

    yAxis.scale(yScale)
    d3.select(leftAxisRef.current).call(yAxis)
  }, [data.length])

  return (
    <div>
      <h1>BarChart</h1>
      <svg width={'100%'} height={height}>
        {els.map((d, i) => (
          <rect
            key={i}
            width={xWidth}
            x={d.x}
            y={d.y}
            height={d.height}
            fill={d.fill}
            transform={'translate(0, -10)'}
          />
        ))}
        <g ref={leftAxisRef} transform={'translate(25, -10)'} />
      </svg>
    </div>
  )
}

export default BarChart
