/*
  todo 新闻详情路由组件
 */

 import React,{Component} from 'react'
 import axios from 'axios'
 import {Row, Col, BackTop} from 'antd'
 import NewsImageBlock from './news_image_block'
 import NewsComments from './news_comments'

 export default class NewsDetail extends Component {

   state = {
     news : {}
   }

   componentDidMount () {
     // todo 发送ajax请求 获取新闻详情数据
     const {uniquekey} = this.props.params
     this.showNewsDetail(uniquekey)
   }

   componentWillReceiveProps (newProps) {
     // console.log('componentWillReceiveProps() ',newProps)
     this.showNewsDetail(newProps.params.uniquekey)
   }

   showNewsDetail(uniquekey){
     const url = `http://newsapi.gugujiankong.com/Handler.ashx?action=getnewsitem&uniquekey=${uniquekey}`
     // todo 发送ajax请求
     axios.get(url)
       .then(response => {
         const news = response.data
         this.setState({news})

         // todo 更新文档的标题
         document.title = news.title
       })
   }

   render () {

     const {news} = this.state

     // console.log(news)

     let {type, uniquekey} = this.props.params
     // todo 如果没有指定 默认指定为top
     if(!type){
         type = 'top'
     }

     return (
       <div>
         <Row>
           <Col span={1}> </Col>
           <Col span={16} className='container'>
             {/*<div dangerouslySetInnerHTML={{__html : news.pagecontent}}> </div>*/}
             <div dangerouslySetInnerHTML={{__html:news.pagecontent}}></div>
             <NewsComments uniquekey={uniquekey} />
           </Col>
           <Col span={6}>
             <NewsImageBlock type={type} count={40} cardWidth='100%'
                             imageWidth='150px' cardTitle="相关新闻" />
           </Col>
           <Col span={1}> </Col>
         </Row>
         <BackTop />
       </div>
     )
   }
 }
