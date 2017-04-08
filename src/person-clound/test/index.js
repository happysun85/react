import React from 'react'
import {Router, Route, hashHistory} from 'react-router';

const R = React.createClass({
    render(){
        return (
            <Router history={hashHistory}>
                <Route path="/" component={A1}>
                    <Route path="/a1" component={A1}/>
                    <Route path="/a2" component={A2}/>
                </Route>
            </Router>
            // <Router history={hashHistory}>
            //     <Route path='*' component={A1}>
            //         <Route path='/a1' component={A1}/>
            //         <Route path='/a2' component={A2}/>
            //     </Route>
            // </Router>
        )
    }
});

const A1 = React.createClass({
    render(){
        return (
            <div>
                1111
                {this.props.children}
            </div>
        )
    }
});

const A2 = React.createClass({
    render(){
        return (
            <div>
                2222
            </div>
        )
    }
});

export default R
