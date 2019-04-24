import React from 'react'
import * as d3 from 'd3'

function Slice(props) {
  const { pie } = props
  const arc = d3
    .arc()
    .innerRadius(0)
    .outerRadius(100)

  let interpolate = d3.interpolateRgb('#32CD32', '#DC143C')

  return pie.map((slice, index) => {
    let color = interpolate(index / (pie.length - 1))

    return <path d={arc(slice)} fill={color} />
  })
}

export default Slice
