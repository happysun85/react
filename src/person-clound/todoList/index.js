import React from 'react';
import List from './list/list'
import Filter from './filter/filter'

import './index.css'

const TodoList = React.createClass({
    getInitialState: function() {
        return {
            dataArr: [],
            filterType: ''
        }
    },
    render(){
        return (
            <div className="listContaienr">
                <h3>todoMvc</h3>
                <div className="inputBox">
                    <input onKeyPress={this.handleInput} placeholder="输入计划..." type="text"/>
                </div>
                <List
                    data={this.state.dataArr}
                    hundleOnCheck={this.hundleOnCheck}
                    filterType={this.state.filterType}
                />
                <Filter
                    hundelOnFilter={this.hundelOnFilter}
                    filterType={this.state.filterType}
                />
            </div>
        )
    },
    handleInput: function(e) {
        if (e.charCode === 13) {
            let arr = [...this.state.dataArr];
            arr.push({
                title: e.target.value,
                finished: false
            });
            this.setState({
                dataArr: arr
            });
            e.target.value = '';
        }
    },
    hundleOnCheck: function(e, index) {
        let arr = this.state.dataArr;
        arr[index].finished = e.target.checked;
        this.setState({
            dataArr: [...arr]
        });
    },
    hundelOnFilter: function(e, type) {
        this.setState({
            filterType: type
        })
    }
});

export default TodoList;
