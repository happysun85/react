import React from 'react'
import {Router, Route, Link, hashHistory, IndexRoute} from 'react-router'
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import CloudList  from './cloud/list/list'
import Timer  from './timer/index'
import Todo  from './todoList/index'
import Nav from './cloud/nav/nav'
import 'antd/dist/antd.css'
import './index.css'
import {getFileList, rename, mkdir, remove} from './api'
const {SubMenu} = Menu;
const {Header, Content, Sider} = Layout;

var R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                {/*使用这种*号通配后下列路由就失效*/}
                {/* <Route path='*' component={Mylayout}/>*/}
                <Route path='/' component={Mylayout}>
                    <IndexRoute component={CloudList}/>
                    <Route path='/todo' component={Todo}/>
                    <Route path='/timer' component={Timer}/>
                    <Route path='/*' component={CloudList}/>
                </Route>
            </Router>
        )
    }
});

var Mylayout = React.createClass({
    getInitialState: function() {
        return {
            path: ['']
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
                            <span><Icon type="cloud"/><Link to={'/'}>云盘</Link></span>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <span><Icon type="database"/><Link to={'/todo'}>todo</Link></span>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <span><Icon type="clock-circle-o"/><Link to={'/timer'}>计时器</Link></span>
                        </Menu.Item>
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
    getFile(path){
        let that = this;
        that.setState({
            loading: true
        });

        getFileList(path, function(res) {
            that.setState({
                file: res.file,
                path: res.path.split('/'),
                loading: false
            })
        }, function(err) {
            console.log('err', err)
        })
    },
    // 已存在的组件接收到新参数时调用
    componentWillReceiveProps(nextProps){
        // this.nextProps.params
       /* let pathname = this.props.location.pathname;
        let path_ext = pathname.replace('/cloud/list', '/');
        console.log(pathname);
        this.setState({
            path: pathname.split('/')
        })
        this.getFile(path_ext);*/
    },
    changeRoute: function() {
        alert(arguments);
    }
});

export default R
