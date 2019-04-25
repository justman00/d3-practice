import React from 'react'
import * as d3 from 'd3'

const data = [100, 250, 320, 50, 400, 140, 540]

function BarChart() {
  const [els, setEls] = React.useState([])
  const height = 800
  const xWidth = 100

  React.useEffect(() => {
    const res = data.map((el, i) => ({
      x: i * xWidth,
      y: height - el,
      height: el,
      fill: 'blue'
    }))

    setEls(res)
  }, [data.length])

  return (
    <div>
      <h1>BarChart</h1>
      <svg width={'100%'} height={height}>
        {els.map(d => (
          <rect
            width={xWidth}
            x={d.x}
            y={d.y}
            height={d.height}
            fill={d.fill}
          />
        ))}
      </svg>
    </div>
  )
}

export default BarChart
