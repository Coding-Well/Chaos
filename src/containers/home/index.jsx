import React from 'react'
import classNames from 'classnames'

class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0
        }
    }

    render() {
        return (
            <div>
                <h2>Hey, Chaos!</h2>
            </div>
        )
    }
}

export default Home