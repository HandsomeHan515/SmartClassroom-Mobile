import React, { Component } from 'react'
import { View, Text, } from 'react-native'
import { TabBar, Icon } from 'antd-mobile'

class Tab extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedTab: 'redTab',
    }
  }

  renderContent = props => {
    return (
      <Text>你好啊</Text>
    )
  }

  render() {
    return (
      <TabBar
        unselectedTintColor="#949494"
        tintColor="#33A3F4"
        barTintColor="red"
      >
        <TabBar.Item
          title="签到"
          key="签到"
          selected={this.state.selectedTab === 'redTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'redTab',
            })
          }}
          data-seed="logId1"
        >
          <this.renderContent />
        </TabBar.Item>
        <TabBar.Item
          title="信息"
          key="信息"
          selected={this.state.selectedTab === 'yellowTab'}
          onPress={() => {
            this.setState({
              selectedTab: 'yellowTab',
            })
          }}
        >
          <this.renderContent />
        </TabBar.Item>
      </TabBar>
    )
  }
}

export default Tab