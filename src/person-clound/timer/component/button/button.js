import React, {Component} from 'react'
import {Button} from 'antd'

class Buttons extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="btnBox">
                <Button
                    onClick={() => this.props.handleOnToggle()}
                    type={this.props.type}
                >
                    {this.props.type === 'primary' ? 'Start' : 'Stop'}
                </Button>
                <Button
                    onClick={() => this.props.handleOnReset()}
                >Reset</Button>
                <Button
                    onClick={() => this.props.handleOnLog()}
                >Log</Button>
                <Button
                    onClick={()=>this.props.handleOnClear()}
                >Clear Log</Button>
            </div>
        )
    }
}

export default Buttons
