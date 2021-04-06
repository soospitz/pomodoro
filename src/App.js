import React, { useState, useEffect, useRef } from 'react';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

import './App.css';

function App() {
	const [seconds, setSeconds] = useState(0);
	const [minutes, setMinutes] = useState(0);
	const [pause, setPause] = useState(true);
	const [start, setStart] = useState(false);
	const [breaks, setBreaks] = useState(false);
	const [shortBreaks, setShortBreaks] = useState(false);
	const [longBreaks, setLongBreaks] = useState(false);

	const handleClick = () => {
		console.log('handle clicked');
		if (start === false) {
			setMinutes(25);
			setStart(true);
		}
		setPause(!pause);

		console.log(pause, 'pause');
	};
	const handleReset = () => {
		setMinutes(25);
		setSeconds(0);
		setStart(false);
		setPause(true);
	};
	const timerProps = {
		size: 120,
		strokeWidth: 6,
	};

	var interval = useRef();
	useEffect(() => {
		if (pause === false) {
			interval.current = setInterval(() => {
				if (seconds > 0) {
					setSeconds(seconds - 1);
				}
				if (seconds === 0) {
					if (minutes === 0) {
						clearInterval(interval.current);
					} else {
						setMinutes(minutes - 1);
						setSeconds(59);
					}
				}
				if (minutes === 0 && seconds === 0) {
					if (breaks) {
						setMinutes(25);
						setBreaks(false);
						setShortBreaks(false);
						setLongBreaks(false);
					} else {
						setMinutes(1);
						setBreaks(true);
						setShortBreaks(true);
						setLongBreaks(false);
					}
					setStart(true);
					setPause(true);
				}
			}, 1000);
		}

		return () => {
			clearInterval(interval.current);
		};
	});
	console.log(seconds);
	console.log(minutes, 'minutes');
	return (
		<div>
			<div className="container">
				<h1>Pomodoro Timer</h1>
				<h1>{breaks ? 'BREAK' : 'POMODORO'}</h1>
				<div className="buttons">
					<div className="button">pomodoro</div>
					<div
						className="button"
						onClick={() => {
							setMinutes(5);
							setSeconds(0);
							setPause(true);
							setShortBreaks(true);
						}}
					>
						short
					</div>
					<div
						className="button"
						onClick={() => {
							setMinutes(15);
							setSeconds(0);
							setPause(true);
							setLongBreaks(true);
						}}
					>
						long
					</div>
				</div>
				<div className="time">
					{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</div>
				<div className="buttons-bottom">
					<div className="button" onClick={handleClick}>
						{pause ? 'START' : 'PAUSE'}
					</div>

					<div className="button" onClick={handleReset}>
						RESET
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
