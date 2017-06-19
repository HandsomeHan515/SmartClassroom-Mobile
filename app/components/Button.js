import React, { Component, PropTypes } from 'react'
import { Text, View, StyleSheet, Platform } from 'react-native'

class Button extends Component {
  render() {
    const { text, onPress } = this.props

    return (
      <View style={styles.content} onPress={onPress}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  text: {
    color: 'white',
    fontSize: 13,
  },
  content: {
    height: 45,
    backgroundColor: '#046ada',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 3
  },
})

export default Button