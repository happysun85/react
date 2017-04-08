import React from 'react'
import './filter.css'
var Filter = React.createClass({
    render(){
        let {hundelOnFilter, filterType} = this.props;
        return (
            <div className="filterBox">
                <span className={filterType == 'all' ? 'current' : ''} onClick={(e) => hundelOnFilter(e, 'all')}>All</span>
                <span className={filterType == 'active' ? 'current' : ''} onClick={(e) => hundelOnFilter(e, 'active')}>Active</span>
                <span className={filterType == 'completed' ? 'current' : ''} onClick={(e) => hundelOnFilter(e, 'completed')}>Completed</span>
            </div>
        )
    }
});
export default Filter
