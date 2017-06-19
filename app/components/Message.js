import React, { Component } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { appCore } from '../service'
import { transformTime } from '../method/time'

class Message extends Component {
  render() {
    console.log('message: %o', appCore.message)

    return (
      <ScrollView>
        {
          appCore.message.map((item, index) => {
            const time = transformTime(item.time, type = '年')
            return (
              <View key={item.id} style={{ padding: 10, borderColor: '#fff', borderStyle: 'solid', borderWidth: 1, borderRadius: 6, marginTop: 20 }}>
                <Text style={{ marginBottom: 3 }}>内容：<Text style={{ color: 'red' }}>{item.content}</Text></Text>
                <Text>时间：{time}</Text>
              </View>
            )
          })
        }
      </ScrollView>
    )
  }
}

export default Message