import React from 'react'
import {Button, Checkbox} from 'antd'
import './list.css'

var Item = React.createClass({
  render(){
    const {title, hundleOnCheck, index, finished, hundelOnDel} = this.props;
    return (
        <li className={finished ? 'del' : ''}>
          <div className="checkBox">
            <Checkbox
                onClick={(e) => hundleOnCheck(e, index)}/>
          </div>
          <div className="Title">{title}</div>
          <div>
            <Button
                type="danger"
                onClick={(e) => hundelOnDel(e, index)}
            >删除</Button>
          </div>
        </li>
    )
  }
});

var List = React.createClass({

  render(){
    const {hundelOnDel, hundleOnCheck, filterType} = this.props;
    const list = this.props.data.map(function(item, index) {
      if (filterType === 'active' && item.finished) {
        return
      }
      if (filterType === 'completed' && !item.finished) {
        return
      }
      return <Item
          key={index}
          index={index}
          title={item.title}
          finished={item.finished}
          hundleOnCheck={hundleOnCheck}
          hundelOnDel={hundelOnDel}
      />
    });
    return (
        <ul className="list">
          {list}
        </ul>
    )
  }
});

export default List
