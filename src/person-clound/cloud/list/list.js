import React from 'react'
import {Icon, Row, Col} from 'antd'
import {getFileList} from '../../api.js'

import './list.css';

let FileItem = React.createClass({
  render(){
    const {name, ext, path, onFileClick} = this.props;
    return (
        <div className="item" onClick={onFileClick(path)}>
          <Icon className="icon" type="folder-open"/>
          <p>{name}</p>
        </div>
    )
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
              onFileClick={that.onFileClick}
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
  onFileClick: function(path) {
    console.log(path);
  }
});

export default CloudList
