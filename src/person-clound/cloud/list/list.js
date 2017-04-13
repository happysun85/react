import React from 'react'
import {hashHistory, Link} from 'react-router'
import {Icon, Row, Col} from 'antd'
import {getFileList} from '../../api.js'

import './list.css';

let FileItem = React.createClass({
    render(){
        const {name, ext, path} = this.props;
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
            <div onClick={this.onFileClick} className="item">
                <Icon className="icon" type={type}/>
                <p>{name}</p>
            </div>
        )
    },
    onFileClick: function() {
        const {name, ext, path} = this.props;
        hashHistory.push(path);
    }
});

let CloudList = React.createClass({
    getInitialState: function() {
        return {
            file: [],
            path: [],
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
                />
            )
        });
        return <div className="listBox">{file}</div>

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
    componentWillReceiveProps: function(nextProps) {
        let pathname = this.props.location.pathname;
        this.setState({
            path: pathname.split('/')
        })
        console.log('=============')
        console.log(nextProps)
        this.getFile(pathname);
    }

});

export default CloudList
