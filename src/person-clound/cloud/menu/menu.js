import React from 'react';
import './menu.css'

let Menu = React.createClass({
  render (){
    return (
        <ul
            className="rightkey-menu"
            style={{
              display: this.props.display ? 'block' : 'none',
              left: this.props.x,
              top: this.props.y
            }}
        >
          <li onMouseDown={(e) => this.mousedown(e, 'newFolder')}>新建文件夹</li>
          <li onMouseDown={(e) => this.mousedown(e, 'rename')}>重命名</li>
          <li onMouseDown={(e) => this.mousedown(e, 'delete')}>删除</li>
          <li onMouseDown={(e) => this.mousedown(e, 'copy')}>复制</li>
        </ul>
    )
  },
  mousedown(e, action){
    const {onAction} = this.props;
    onAction(action);
    e.preventDefault();
    e.stopPropagation();
  }
});

export default Menu;
