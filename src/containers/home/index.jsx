import React from 'react'
import classNames from 'classnames'
import style from './index.less'
import img from './index.png'

console.log(style);


class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            seconds: 0
        }
    }

    tick() {
        this.setState(prevState =>({
            seconds: prevState.seconds + 1
        }))
    }

    componentDidMount() {
        this.interval = setInterval(() => this.tick(), 1000)
    }

    componentWillMount() {
        clearInterval(this.interval)
    }

    render() {
        return (
            <div>
                <h2>这是首页,this.state.seconds: <span className='time'>{this.state.seconds}</span></h2>
                <img src={img} />
            </div>
        )
    }
}

export default Home