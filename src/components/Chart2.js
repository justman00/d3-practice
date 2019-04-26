import React, { Component } from 'react'
import * as d3 from 'd3'

export default class Chart2 extends Component {
  constructor(props) {
    super()
    this.state = {
      d: props.d
    }
  }

  pathRef = React.createRef()

  shouldComponentUpdate = nextProps => {
    if (nextProps.d === this.state.d) {
      return false
    }
    return true
  }

  componentDidUpdate = () => {
    let el = d3.select(this.pathRef.current)

    el.transition()
      .duration(1000)
      .attr('d', this.props.d)
      .on('end', () => {
        this.setState({
          d: this.props.d
        })
      })
  }

  render() {
    return (
      <div>
        <svg width="650" height="400">
          <path stroke="blue" fill="none" d={this.state.d} ref={this.pathRef} />
        </svg>
      </div>
    )
  }
}
