import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
} from 'react-native'

import { timeDuration } from '../method/time'

class Timer extends Component {
  constructor(props) {
    super(props)

    const { time, start } = this.props
    this.state = {
      time,
      start,
    }

    this.timer = null
  }

  componentWillMount() {
    const { start } = this.state
    if (start) {
      this.start()
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }

  countUp = () => {
    let newTime = this.state.time + 1

    this.setState({
      time: newTime
    })
  }

  start = () => {
    clearInterval(this.timer)
    this.timer = setInterval(this.countUp, 1000)
  }

  render() {
    const { time } = this.state
    const newTime = timeDuration(time)

    return (
      <Text>
        {newTime}
      </Text>
    )
  }
}

export default Timer