import React, { Component } from 'react';
import './main.scss';


class Clock extends Component {
    constructor(props){
        super(props);
        this.timer = this.timer.bind(this);
    }

    componentWillMount() {
        this.setState({ currentCount: this.props.time })
    }

    componentDidMount() {
        let intervalId = setInterval(this.timer, 1000);
        this.setState({
            intervalId: intervalId
        });
    }

    componentWillUnmount() {
       clearInterval(this.state.intervalId);
    }

    timer() {
       var newCount = this.state.currentCount - 1;
       if (newCount >= 0) {
           this.setState({ currentCount: newCount });
       } else {
           clearInterval(this.state.intervalId);
       }
    }

    render() {
        return (
            <div className="col-2 text-center">
               {Math.ceil(this.state.currentCount / 60)}:{this.state.currentCount % 60}
            </div>
        );
    }
}

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentCount: 300
        }
    }
    render() {
        return (
            <div className="container-fluid">
                <div className="row align-items-center justify-content-center">
                    <Clock time={this.state.currentCount}/>
                </div>
            </div>
        );
    }
}

export default App;
