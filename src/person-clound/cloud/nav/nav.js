import React from 'react'
import {Link} from 'react-router'
import {Breadcrumb} from 'antd';
var Nav = React.createClass({

    render(){
        var to = '';
        var path = this.props.path.map(function (item, index) {
            return (
                <Breadcrumb.Item key={index}>
                    <Link to={to + '/' + item}>{item}</Link>
                </Breadcrumb.Item>
            )
        });
        return (
            <Breadcrumb style={{margin: '12px 0'}}>
                {path}
            </Breadcrumb>
        )
    }
});


export default Nav
