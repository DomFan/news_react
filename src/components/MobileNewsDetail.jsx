/*
 todo 移动端 新闻详情组件
 */

import React, {Component} from 'react'
import {BackTop} from 'antd'
import axios from 'axios'

import NewsComments from './news_comments'

export default class MobileNewsDetail extends Component {

  state = {
    news: ''
  }

  componentDidMount() {
    const {uniquekey} = this.props.params
    const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`

    axios.get(url)
      .then(response => {
        const news = response.data
        this.setState({news})

        document.title = news.title + " - React News | React驱动的新闻平台"
      })
  }

  render() {
    return (
      <div style={{padding: '10px'}}>
        <div className="mobileDetailsContainer" dangerouslySetInnerHTML={{__html: this.state.news.pagecontent}}></div>
        <hr/>
        <NewsComments uniquekey={this.props.params.uniquekey}/>
        <BackTop />
      </div>
    )
  }
}