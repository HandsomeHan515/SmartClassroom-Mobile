import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Image, PixelRatio, AsyncStorage } from 'react-native'
import { Button } from 'antd-mobile'

class Signin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '韩帅',
      password: '123456',
    }
  }

  handleClick = () => {
    this.props.login(true)
    AsyncStorage.setItem('username', this.state.username)
  }

  render() {
    return (
      <View style={styles.view}>
        <View style={styles.editGroup}>
          <View style={styles.username}>
            <TextInput
              autoCapitalize='none'
              style={styles.edit}
              autoCorrect={false}
              placeholder="用户名"
              value={this.state.username}
              placeholderTextColor="#c4c4c4"
              selectTextOnFocus={true}
              onChangeText={username => this.setState({ username })}
            />
          </View>
          <View style={{ height: 1 / PixelRatio.get(), backgroundColor: '#c4c4c4' }} />
          <View style={styles.password}>
            <TextInput
              style={styles.edit}
              placeholder="密码"
              value={this.state.password}
              placeholderTextColor="#c4c4c4"
              secureTextEntry={true}
              selectTextOnFocus={true}
              secureTextEntry={true}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <Button
            style={{ marginTop: 10 }}
            type='primary'
            onClick={this.handleClick}
          >
            登录
          </Button>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: 'rgb(22,131,251)',
  },
  editGroup: {
    margin: 20,
  },
  username: {
    marginTop: 100,
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  password: {
    height: 48,
    backgroundColor: 'white',
    justifyContent: 'center',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  edit: {
    height: 40,
    fontSize: 13,
    backgroundColor: '#fff',
    paddingLeft: 15,
    paddingRight: 15,
  },
})

export default Signin