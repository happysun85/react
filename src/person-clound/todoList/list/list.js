import React from 'react'
import './list.css'

var Item = React.createClass({
    render(){
        const {title, hundleOnCheck, index, finished} = this.props;

        return (
            <li className={finished ? 'del' : ''}>
                <div className="checkBox">
                    <input type="checkbox" onClick={(e) => hundleOnCheck(e, index)}/>
                </div>
                <span className="Title">{title}</span>
            </li>
        )
    }
});

var List = React.createClass({

    render(){
        const hundleOnCheck = this.props.hundleOnCheck;
        const filterType = this.props.filterType;
        const list = this.props.data.map(function(item, index) {
            if (filterType == 'active' && item.finished) {
                return
            }
            if (filterType == 'completed' && !item.finished) {
                return
            }
            return <Item
                key={index}
                index={index}
                title={item.title}
                finished={item.finished}
                hundleOnCheck={hundleOnCheck}
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
