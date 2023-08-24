import {Component} from 'react'
import './index.css'

class Stopwatch extends Component {
  state = {
    isRunning: false,
    isPaused: false,
    startTime: null,
    pausedTime: 0,
    interval: null,
    time: '00:00',
  }

  onStartBtn = () => {
    const {pausedTime} = this.state

    this.setState({
      startTime: Date.now() - pausedTime,
      isRunning: true,
      isPaused: false,
      interval: setInterval(this.updateTime, 1000),
    })
  }

  onStopBtn = () => {
    const {
      startTime,

      interval,
    } = this.state

    clearInterval(interval)
    this.setState({
      isRunning: false,
      isPaused: true,
      pausedTime: Date.now() - startTime,
    })
  }

  onResetBtn = () => {
    console.log('Reset btn Clicked')

    const {interval} = this.state

    clearInterval(interval)
    this.setState({
      startTime: null,
      isRunning: false,
      isPaused: false,
      pausedTime: 0,
      time: '00:00',
    })
  }

  updateTime = () => {
    const {startTime} = this.state
    const currentTime = Date.now() - startTime
    const minutes = Math.floor(currentTime / 60000)
    const seconds = Math.floor((currentTime % 60000) / 1000)

    this.setState({
      time: `${minutes
        .toString()
        .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
    })
  }

  render() {
    const {time, isRunning} = this.state

    return (
      <div className="bg-container">
        <h1 className="heading"> Stopwatch</h1>
        <div className="timer-card">
          <div className="card-heading">
            <img
              src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
              alt="stopwatch"
              className="img"
            />
            <p> Timer</p>
          </div>

          <h1 className="time">{time}</h1>
          <div className="buttons-card">
            <button
              type="button"
              className="btn start-btn"
              onClick={this.onStartBtn}
            >
              {' '}
              Start
            </button>
            <button
              type="button"
              className="btn stop-btn"
              onClick={this.onStopBtn}
            >
              {' '}
              Stop
            </button>
            <button
              type="button"
              className="btn reset-btn"
              onClick={this.onResetBtn}
            >
              {' '}
              Reset
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
