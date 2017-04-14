import React from 'react'
import {hashHistory, Link} from 'react-router'
import {Icon, Modal, Row, Col, message} from 'antd'
import {getFileList, rename, mkdir, remove} from '../../api.js'
import Action from '../action/index'

import Menu from '../menu/menu'

import './list.css';
const host = 'http://101.200.129.112:9527/static/';

let FileItem = React.createClass({
    render(){
        const {name, ext, path, onPick} = this.props;
        let type = '';
        switch (ext) {
            case '':
                type = 'folder-open';
                break;
            case '.info':
                type = 'folder-open';
                break;
            case '.html':
            case '.json':
            case '.text':
            case '.xml':
            case '.css':
                type = 'file-text';
                break;
            case '.jpg':
            case '.png':
            case '.jpeg':
            case '.gif':
                type = 'picture';
                break;
            default:
                type = 'info-circle';
        }
        return (
            <div
                onClick={this.onFileClick}
                onMouseDown={(e) => this.mousedown222}
                className="item">
                <Icon className="icon" type={type}/>
                <p>{name}</p>
            </div>
        )
    },
    onFileClick: function() {
        const {name, ext, path, isFolder} = this.props;
        if (isFolder) {
            hashHistory.push(path);
        } else {
            window.open(host + path);
        }
    },
    mousedown222(e){
        const {name, onPick} = this.props;
        if (e.button == 2) {
            onPick(name)
        }
    },
});

let CloudList = React.createClass({
    getInitialState: function() {
        return {
            file: [],
            path: [],
            menu: {
                display: false,
                x: 0,
                y: 0
            },
            showAction: false
        }
    },
    render (){
        let that = this;
        let file = this.state.file.map(function(item, index) {
            return (
                <FileItem
                    key={item.name + '-' + index}
                    name={item.name}
                    path={item.path}
                    ext={item.ext}
                    isFolder={item.isFolder}
                    onPick={that.pickItem}
                />
            )
        });
        return <div className="listBox"
            onMouseDown={this.mouseDown}
            onContextMenu={(e) => e.preventDefault()}
        >
            {file}
            <Menu
                display={this.state.menu.display}
                x={this.state.menu.x}
                y={this.state.menu.y}
                onAction={(action) => this.menuClick(action)}
            />
            <Action
                action={this.state.action}
                onRename={this.rename}
                onNew={this.newFolder}
                oldValue={this.state.active}
                newValue={this.state.newValue}
                visible={this.state.showAction}
                onCancel={this.hideAction}
                onChange={(e) => this.setState({newValue: e.target.value})}
            />
        </div>
    },

    pickItem(name){
        alert(name);
        this.setState({active: name, newValue: name})
    },
    unPickItem(){
        this.setState({active: '', newValue: name})
    },
    menuClick(action){
        const hasPicked = !!this.state.active;
        if (action == 'rename' && !hasPicked) {
            Modal.error({
                title: '文件重命名',
                content: '请右键选中你要命名的文件(夹)'
            })
            return
        }

        if (action == 'rename' || action == 'newFolder') {
            this.setState({action: action});
            this.showAction();
            return
        }
        if (action == 'delete' && !hasPicked) {
            Modal.error({
                title: '文件删除',
                content: '请右键选中你要命名的文件(夹)'
            })
            return
        }
        if (action == 'delete') {
            this.deleteFile()
        }

        this.hideMenu()
    },
    mouseDown: function(e) {
        if (e.button == 2) {
            this.showMenu(e);
        } else {
            this.hideMenu();
        }
    },
    showMenu(e){
        this.setState({
            menu: {
                x: e.clientX,
                y: e.clientY,
                display: true
            }
        })
    },
    hideMenu(){
        this.setState({menu: {display: false}})
    },
    showAction(){
        this.setState({showAction: true})
    },
    hideAction(){
        this.setState({showAction: false})
    },
    componentDidMount(){
        /*const {params} = this.props;
         const {splat} = params;*/
        let pathname = this.props.location.pathname;
        let path_ext = pathname.replace('/cloud/list', '/');
        this.getFile(path_ext);
    },
    getFile(path){
        let that = this;
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
    newFolder(name){
        var that = this
        var path = this.state.path.join('/') + '/' + this.state.active
        mkdir({
            path: path,
            name: name
        }, function(res) {
            var file = that.state.file
            file.push(res)
            that.setState({file})
            that.pickItem(name)
            that.hideAction()
            message.success('操作成功')
        })
    },
    componentWillReceiveProps: function(nextProps) {
        // nextProps.params.splat || "";
        var pathname = nextProps.params.splat || "";
        // let pathname = this.props.location.pathname;
        this.setState({
            path: pathname.split('/')
        });
        this.getFile(pathname);
    }
});

export default CloudList
