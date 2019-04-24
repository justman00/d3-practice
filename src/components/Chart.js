import React from 'react'
import * as d3 from 'd3'

function Chart({ data }) {
  const width = 500
  const height = 500
  const [chart, setChart] = React.useState([])

  React.useEffect(() => {
    console.log('hi')
    // getting the needed data from the api
    const days = Object.keys(data['Time Series (Daily)'])
    const allValues = Object.values(data['Time Series (Daily)'])

    console.log(allValues)

    const timeScale = d3
      .scaleTime()
      .domain([new Date(days[0]), new Date(days[-1])])
      .range([0, width])
  }, [data])

  return (
    <div>
      <h1>Chart</h1>
    </div>
  )
}

export default Chart
