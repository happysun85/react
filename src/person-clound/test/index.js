import React from 'react'
import {hashHistory, Route} from 'react-router'

import {Router} from  'react-router'

import Repos from './Repos'
import Repo from './Repo'

var Test = React.createClass({
  render(){
    return (
        <Router history={hashHistory}>
          <Route path="/" component={Repos}>
            <Route path="/repos" component={Repos}/>
            {/* add the new route */}
            <Route path="/repos/:userName/:repoName" component={Repo}/>
          </Route>
        </Router>
    )
  }
})

export default Test;
