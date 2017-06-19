/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, AsyncStorage } from 'react-native'

import { Timer, Tab, Message } from './app/components'
import { Signin } from './app/containers'
import { Button } from 'antd-mobile'
import { getMessage, addDetail, updateDetail } from './app/service/apis'
import { appCore } from './app/service'

export default class SmartClassroom extends Component {
  constructor(props) {
    super(props)

    this.state = {
      visible: false,
      showLogin: true,
      showLogout: false,
      showMessage: false,
      hasLog: false,
      username: '',
    }
  }

  componentWillMount() {
    getMessage()
  }

  log = status => {
    const socket = new WebSocket("ws://127.0.0.1:8001/online/")
    const user = {
      username: '韩帅',
      role: 'student',
      id: 4,
      status,
    }

    socket.onopen = function () {
      socket.send(JSON.stringify(user));
    }
    if (socket.readyState == WebSocket.OPEN) socket.onopen()
  }

  componentDidMount() {
    AsyncStorage.getItem('username')
      .then(val => {
        if (val) {
          console.log(val)
          this.setState({
            username: val
          })
        }
      })
  }

  render() {
    const { showLogin, showLogout, showMessage, hasLog } = this.state

    return (
      <View style={{ flex: 1 }}>
        {
          hasLog ?
            <View style={styles.container}>
              <Image source={require('./app/images/1.jpg')} style={styles.backgroundImage}>
                <View style={styles.login}>
                  <Text style={styles.welcome}>
                    智慧教室管理系统
                  </Text>
                  <Text style={styles.people}>
                    欢迎{this.state.username}的到来
                  </Text>
                  {
                    !showLogin ? null :
                      <Button
                        type='primary'
                        style={{ width: 200, marginTop: 30 }}
                        onClick={() => {
                          this.log(1)
                          const date = new Date()
                          const payload = {
                            name: '韩帅',
                            start: Date.parse(date) / 1000,
                            ip: '127.0.0.1',
                            date: `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
                          }
                          addDetail(payload)

                          this.setState({
                            visible: true,
                            showLogin: false,
                            showLogout: true
                          })
                        }}
                      >
                        签到
                      </Button>
                  }
                  {
                    !showLogout ? null :
                      <Button
                        type='warning'
                        style={{ width: 200, marginTop: 30 }}
                        onClick={() => {
                          this.log(0)
                          const payload = {
                            end: Date.parse(new Date()) / 1000,
                            duration: Date.parse(new Date()) / 1000 - appCore.detailStart
                          }
                          updateDetail(payload, appCore.detailID)

                          this.setState({
                            visible: false,
                            showLogout: false,
                            showLogin: true
                          })
                        }}
                      >
                        退出
                </Button>
                  }
                  {
                    this.state.visible ? <Text style={styles.prompt}>在线时长</Text> : null
                  }
                  <Text style={styles.timer}>
                    {
                      this.state.visible ? <Timer start time={0} /> : null
                    }
                  </Text>
                  <Text
                    style={styles.message}
                    onPress={() => {
                      this.setState({
                        showMessage: !this.state.showMessage
                      })
                    }}
                  >
                    {
                      showMessage ?
                        <Text style={{ color: 'red' }}>关闭信息</Text>
                        :
                        <Text>查看信息</Text>
                    }
                  </Text>
                  {
                    !showMessage ? null :
                      <Message />
                  }
                </View>
              </Image>
            </View>
            :
            <Signin
              login={bool => {
                this.setState({
                  hasLog: bool
                })
              }}
            />
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 25,
    color: '#479DDC'
  },
  people: {
    fontSize: 18,
    color: '#E4482F',
    marginTop: 10,
  },
  prompt: {
    fontSize: 14,
    marginTop: 30,
    color: 'blue',
  },
  timer: {
    fontSize: 20,
    marginTop: 10,
    color: '#333',
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  login: {
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  message: {
    marginTop: 10,
  }
})

AppRegistry.registerComponent('SmartClassroom', () => SmartClassroom)
