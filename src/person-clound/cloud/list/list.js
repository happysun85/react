import React from 'react'
import {Icon, Row, Col} from 'antd'
import {getFileList} from '../../api.js'

import './list.css';

var FileItem = React.createClass({
  render(){
    const {name, ext, path} = this.props;
    return (
        <div className="item">
          <Icon className="icon" type="folder-open"/>
          <p>{name}</p>
        </div>
    )
  }
});

var CloudList = React.createClass({
  getInitialState: function() {
    return {
      file: [],
      path: [],
    }
  },
  render (){
    var file = this.state.file.map(function(item, index) {
      return (
          <FileItem
              key={item.name + '-' + index}
              name={item.name}
              path={item.path}
              ext={item.ext}
          />
      )
    })
    return <div className="listBox">{file}</div>

  },
  componentDidMount(){
    const {params} = this.props;
    const {splat} = params;
    this.getFile(splat);
    console.log(splat)
  },
  getFile(path){
    var that = this;
    /*that.setState({
     loading: true
     })*/
    getFileList(path, function(res) {
      console.log(res);
      that.setState({
        file: res.file,
        path: res.path.split('/'),
        loading: false
      })
    }, function(err) {
      console.log('err', err)
    })
  },
})

export default CloudList
