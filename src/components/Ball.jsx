import React from 'react'
import BallComp from './BallComp'

const styles = {
  fontFamily: 'sans-serif',
  textAlign: 'center'
}

class Ball extends React.Component {
  state = {
    ballLeft: true
  }
  ballJump = () =>
    this.setState({
      ballLeft: !this.state.ballLeft
    })

  render() {
    const { ballLeft } = this.state
    return (
      <div style={styles}>
        <h1>D3 transitions in React 16.3 {'\u2728'}</h1>
        <p>Click the ball 👇</p>
        <svg style={{ width: '300', height: '300px' }} onClick={this.ballJump}>
          <BallComp x={ballLeft ? 15 : 250} />
        </svg>
      </div>
    )
  }
}

export default Ball
