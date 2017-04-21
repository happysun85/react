import React, {Component} from 'react'
import formatTime from '../../utils/formatTime'

class DisplayLog extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let lis = this.props.log.map((item, index) => {
            return (
                <li key={index}>{formatTime(item)}</li>
            )
        });
        return (
            <ul className="logBox">
                {lis}
            </ul>
        )
    }
}

export default DisplayLog
