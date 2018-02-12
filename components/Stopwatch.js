class Stopwatch extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			running: false,
			minutes: 0,
			seconds: 0,
			miliseconds: 0,
			resultList: [],
			id: 1
		}
	}

	reset() {
		this.setState({
			minutes: 0,
			seconds: 0,
			miliseconds: 0	
		})
	}

	format(times) {
		return `${this.pre0(times.minutes)}:${this.pre0(times.seconds)}:${this.pre0(times.miliseconds)}`;
	}

	calculate() {
		this.setState( (prevState) => {
			return {miliseconds: prevState.miliseconds + 1}
		})
		if(this.state.miliseconds >= 100) {
			this.setState( (prevState) => {return {seconds: prevState.seconds + 1}});
			this.setState( {miliseconds: 0});
		}
		if(this.state.seconds >= 60) {
			this.setState( (prevState) => {return {minutes: prevState.minutes + 1}});
			this.setState( {seconds: 0});
		}
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
		if(this.state.running) {
			this.setState({ running: false })
			clearInterval(this.watch);
		}
	}

	pre0(value) {
		let result = value.toString();
		return (result.length < 2) ? '0' + result : result;
	}

	shotTime() {
			this.setState( (prevState) => { return { id: prevState.id + 1 }} )
			let singleTime = {
				time: this.format(this.state),
				id: this.state.id
			};

			this.setState( (prevState) => { return {
				resultList: [singleTime, ...prevState.resultList]
			}})
	}

	clear() {
		this.setState({
			resultList: [],
			id: 1
		})
	}

	render() {
		return(
				<div id="container">
					<div className="controls">
						<Button text="Start" onClick={this.start.bind(this)} />
						<Button text="Stop"  onClick={this.stop.bind(this)} />
						<Button text="Reset" onClick={this.reset.bind(this)} />
						<Button text="Save" onClick={this.shotTime.bind(this)} />
						<Button text="Reset List" onClick={this.clear.bind(this)} />
					</div>
					<Display result={this.format(this.state)} />
					<ResultList list={this.state.resultList} />
				</div>
			)
	}
}