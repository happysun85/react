import React from 'react';
import List from './list/list'
import Filter from './filter/filter'

import './index.css'

var TodoList = React.createClass({
      getInitialState: function() {
        return {
          dataArr: [],
          filterType: 'all'
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
                  filterType={this.state.filterType}
                  hundleOnCheck={this.hundleOnCheck}
                  hundelOnDel={this.hundelOnDel}
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
      },
      hundelOnDel: function(e, index) {
        let arr = this.state.dataArr;
        arr.splice(index, 1);
        this.setState({
          dataArr: [...arr]
        })
      }
    })
;

export default TodoList;
