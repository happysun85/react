import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import CloudList  from './cloud/list/list'
import Nav from './cloud/nav/nav'
import 'antd/dist/antd.css'
import './index.css'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

var R = React.createClass({
  render(){
    return (
        <Router history={hashHistory}>
          <Route path='*' component={Mylayout}>
            <IndexRoute component={CloudList}/>
            <Route path='/cloud/list' component={CloudList}/>
          </Route>
        </Router>
    )
  }
});

var Mylayout = React.createClass({
  getInitialState: function() {
    return {
      path: ['cloud'],
    }
  },
  render(){
    return <Layout>
      <Header className="header">
        <div className="logo"/>
        <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={['2']}
            style={{lineHeight: '64px'}}
        >
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Header>
      <Layout>
        <Sider width={200} style={{background: '#fff'}}>
          <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              style={{height: '100%'}}
          >
            <Menu.Item key="1">
              <span><Icon type="cloud"/><Link to={'/cloud'}>云盘</Link></span>
            </Menu.Item>

            <SubMenu key="sub2" title={<span><Icon type="laptop"/>subnav 2</span>}>
              <Menu.Item key="5">option5</Menu.Item>
              <Menu.Item key="6">option6</Menu.Item>
              <Menu.Item key="7">option7</Menu.Item>
              <Menu.Item key="8">option8</Menu.Item>
            </SubMenu>
            <SubMenu key="sub3" title={<span><Icon type="notification"/>subnav 3</span>}>
              <Menu.Item key="9">option9</Menu.Item>
              <Menu.Item key="10">option10</Menu.Item>
              <Menu.Item key="11">option11</Menu.Item>
              <Menu.Item key="12">option12</Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>
        <Layout style={{padding: '0 24px 24px'}}>
          <Nav path={this.state.path}/>
          <Content style={{background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    </Layout>
  },
  componentWillReceiveProps(nextProps){
    const {params} = nextProps;
    const {splat} = params;
    // this.getFile(splat)
    this.setState({
      path: splat.split('/')
    })
    console.log('componentWillReceiveProps', splat)
  },
  changeRoute: function() {
    alert(arguments);
  }
})

export default R
