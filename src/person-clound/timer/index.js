import React, {Component} from 'react'
import Buttons from './button/button'
class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {

      text: 'primary'//danger
    }

    this.hundleOnToggle = this.hundleOnToggle.bind(this);
  }

  render() {
    return (
        <div>
          <Buttons hundleOnToggle={this.hundleOnToggle} type={this.state.text}/>
        </div>
    )
  }

  hundleOnToggle = function() {
    this.setState({
      text: this.state.text === 'primary' ? 'danger' : 'primary'
    })
  }
}

export default Timer
