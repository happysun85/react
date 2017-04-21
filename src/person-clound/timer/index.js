import React, {Component} from 'react'
import Buttons from './component/button/button'
import DisplayLog from './component/displaylog/displaylog'
import formatTime from './utils/formatTime';
import './index.css'
class Timer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: 'primary',//danger
            time: 0,        //计时器时间
            log: []
        };
        this.timer;

        this.handleOnToggle = this.handleOnToggle.bind(this);
        this.handleOnReset = this.handleOnReset.bind(this);
        this.handleOnLog = this.handleOnLog.bind(this);
        this.handleOnClear = this.handleOnClear.bind(this);
    }

    render() {
        const time = formatTime(this.state.time);
        return (
            <div>
                <h1>{time}</h1>
                <Buttons
                    type={this.state.text}
                    handleOnToggle={this.handleOnToggle}
                    handleOnReset={this.handleOnReset}
                    handleOnLog={this.handleOnLog}
                    handleOnClear={this.handleOnClear}
                />
                <DisplayLog
                    log={this.state.log}
                />
            </div>
        )
    }

    handleOnToggle = function() {
        if (this.state.text === 'primary') {
            this.timer = setInterval(() => {
                this.setState({time: ++this.state.time})
            }, 10)
        } else {
            clearInterval(this.timer);
        }

        this.setState({
            text: this.state.text === 'primary' ? 'danger' : 'primary'
        })
    };
    handleOnReset = function() {
        this.setState({
            time: 0
        })
    };
    handleOnLog = function() {
        this.setState({
            log: [this.state.time, ...this.state.log]
        })
    }
    handleOnClear = function() {
        this.setState({
            log: []
        })
    }

}

export default Timer
