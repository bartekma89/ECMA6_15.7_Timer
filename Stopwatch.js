class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
		}
	}

	format(times) {
		return `${pre0(times.minutes)}:${pre0(times.seconds)}:${pre0(times.miliseconds)}`;
	}

	calculate() {
		this.setState( (prevState) => {
			return {miliseconds: prevState.miliseconds + 1}
		})
		if(this.state.times.miliseconds >= 100) {
			this.setState( (prevState) => {return {seconds: prevState.seconds + 1}});
			this.setState( () => {miliseconds: 0});
		}
		if(this.state.times.seconds >= 60) {
			this.setState( (prevState) => {return {minutes: prevState.minutes + 1}});
			this.setState( () => {seconds: 0});
		}

		console.log(this.state.times.miliseconds);
		console.log(this.state.times.seconds);
	}

	step() {
		if(!this.state.running) return;
		this.calculate();
	}

	start() {
		if(!this.state.running) {
			this.setState({ running: true })
			this.watch = setInterval(() => this.step(), 10);
		}
	}

	stop() {
		this.state.running = false;
		clearInterval(this.watch);
		console.log('stop');
	}

	render() {
		return(
				<div id="container">
					<div className="controls">
						<Button text="Start" onClick={this.start.bind(this)}/>
						<Button text="Stop"  onClick={this.stop.bind(this)}/>
						<Button text="Reset" />
					</div>
					<div className="stopwatch">{this.format(this.state.times)}</div>
					<ul className="result">Result list</ul>
				</div>
			)
	}
}

function pre0(value) {
	let result = value.toString();
	return (result.length < 2) ? '0' + result : result;
}

const Button = (props) => {
	return <button type='button' className="btn" {...props}>{props.text}</button>
}

ReactDOM.render(<Stopwatch />, document.getElementById('root'));