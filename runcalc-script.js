/*
Calculate marathon running pace or time given a pace or distance given pace and time.
Take original runcalc.js and add the abillity to deal with different distance units, more race types, metric/imperial units and conversions

https://www.hillrunner.com/calculators/suggested-training-paces/
http://www.coolrunning.com/engine/4/4_1/96.shtml
Marathon distance: 42.195 kilometres or 26.219 mi - Wikipedia
*/

(	function () {
		const calculator = document.getElementById('calculate');

		const paceInput = document.getElementById('pace-input');
		const distanceInput = document.getElementById('distance-input');
		const timeInput = document.getElementById('time-input');
		
		document.getElementById('calc-pace').addEventListener('click', e => calculate(e.target.id), false);
		document.getElementById('calc-distance').addEventListener('click', e => calculate(e.target.id), false);
		document.getElementById('calc-time').addEventListener('click', e => calculate(e.target.id), false);
		const form = document.getElementById('calcForm');
		
		const theForm = document.getElementById('calcForm');
		function calculate(calcWhich) {
			const which = calcWhich.split('-')[1];
			const time = theForm['hours'].value + ':' + theForm['minutes'].value + ':' + theForm['minutes'].value;
			const pace = theForm['pace-minutes'].value + ':' + theForm['pace-seconds'].value;
			const distance = theForm['distance'].value;
			switch(which) {
				case 'pace':
					const calcRacePace = toSeconds(time) / distance;
					const paceMinutes = Math.floor(calcRacePace/60);
					const paceSeconds = (calcRacePace/60 - paceMinutes) * 60;
					// console.log({calcRacePace});
					theForm['pace-minutes'].value = paceMinutes;
					theForm['pace-seconds'].value = Math.round(paceSeconds);
					break;
				case 'time':
					// const calcRaceTime = new Date((toSeconds(pace) * distance) * 1000).toISOString().substring(11, 19).replace(/^0+/, '');
					const calcRaceTime = (toSeconds(pace) * distance);
					const timeHours = Math.floor(calcRaceTime / 3600);
					const timeMinutes = Math.floor(((calcRaceTime / 3600) - timeHours) * 60);
					const timeSeconds = Math.round(((((calcRaceTime / 3600) - timeHours) * 60) - timeMinutes) * 60);
					// console.log({calcRaceTime}, {timeHours}, {timeMinutes}, {timeSeconds});
					theForm['hours'].value = timeHours;
					theForm['minutes'].value  = timeMinutes;
					theForm['seconds'].value = timeSeconds;
					break;
				case 'distance':
					theForm['distance'].value = (toSeconds(time) / toSeconds(pace)).toFixed(2);
					break;
				default:
			}
		}
		
// try running parseInt() 
const toSeconds = timeStr => +(timeStr.split(':').reduce((acc,time) => (60 * acc) + +time));

calcTime = function(pace, distance, unit) {
	console.log(arguments);
	// given distance and pace, calculate time it will take to complete the distance
	// pace is in format: mm:ss per distance unit
	// unit: miles, kilometers
	const time = toSeconds(pace) * distance;
	return new Date(time * 1000).toISOString().substring(11, 19).replace(/^0+/, '');
}

calcPace = function (time, distance, unit) {
	// given time and distance, calculate pace
	const timeDistance = toSeconds(time) / distance;
	return new Date(timeDistance * 1000).toISOString().substring(14, 19).replace(/^0+/, '');
}

calcDistance = function (pace, time) {
	console.log('Distance');
	// given a pace and a time, calculate the distance covered
	// pace: MM:SS; time: HH:MM:SS
	return toSeconds(time) / toSeconds(pace) 
}
	form.onsubmit = 
			function(event) {
				// console.log(event);
				const theForm = event.target
				const time = theForm['hours'].value + ':' + theForm['minutes'].value + ':' + theForm['minutes'].value;
				const pace = theForm['pace-minutes'].value + ':' + theForm['pace-seconds'].value;
				const distance = theForm['distance'].value;
				// const resultLabel = document.getElementById('resultLabel').innerText;
				resultLabel = '';
				switch(resultLabel) {
					case 'pace':
						theForm['result'].value = calcPace(time, distance);
						break;
					case 'time':
						theForm['result'].value = calcTime(pace, distance);
						break;
					case 'distance':
						theForm['result'].value = calcDistance(pace, time);
						break;
					default:
				}
				event.preventDefault();
			};
	}
)(); // end iife

