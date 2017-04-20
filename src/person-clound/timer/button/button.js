import React, {Component} from 'react'
import {Button} from 'antd'

class Buttons extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
        <div>
          <Button
              onClick={() => this.props.hundleOnToggle()}
              type={this.props.type}
          >
            {this.props.type === 'primary' ? 'start' : 'stop'}
          </Button>
          <Button>reset</Button>
          <Button>start</Button>
          <Button>clear</Button>
        </div>
    )
  }
}

export default Buttons
