/*
Calculate marathon running pace or time given a pace or distance given pace and time.
TODO: add abillity to deal with different distance units, choose race types, metric/imperial units and conversions

https://www.hillrunner.com/calculators/suggested-training-paces/
http://www.coolrunning.com/engine/4/4_1/96.shtml
Marathon distance: 42.195 kilometres or 26.219 mi - Wikipedia
*/

(	function () {
		const calculator = document.getElementById('calculate');

		document.getElementById('calc-pace').addEventListener('click', e => calculate(e.target.id), false);
		document.getElementById('calc-distance').addEventListener('click', e => calculate(e.target.id), false);
		document.getElementById('calc-time').addEventListener('click', e => calculate(e.target.id), false);
		
		const radios = document.querySelector("input[name='unit']");
	// radios is a nodelist
	// use radios.value and change event to read the user choice
	// console.log({radios});
		const theForm = document.getElementById('calcForm');
		let unitFactor = 1;
		function calculate(calcWhich) {
			const which = calcWhich.split('-')[1];
			const time = theForm['hours'].value + ':' + theForm['minutes'].value + ':' + theForm['minutes'].value;
			const pace = theForm['pace-minutes'].value + ':' + theForm['pace-seconds'].value;
			const distance = parseInt(theForm['distance'].value);
			/*
			 user indicates Km or Miles for distance and pace
			 if units match, unitFactor = 1
			 else if distance in Km and pace in miles
			 		unitFactor = 0.62150404
			 else if distance in miles and pace in Km
			 		unitFactor = 1.609
			*/
			const regex = /[K|M]/gi;
			const distanceUnit = theForm['distance'].value.match(regex)[0].toLowerCase();
			const paceUnit = theForm['unit'].value;
			if( distanceUnit === paceUnit ) {
				unitFactor = 1;
			}
			else if( distanceUnit ==='k' ) {
				unitFactor = 0.62150404
			}
			else {
				unitFactor = 1.609
			}
			console.log({unitFactor});
			// TODO: validate unit - must be 'K' for kilometers or 'M' for miles. case insensitive.
			// TODO: check calculations - I may not be getting the right answer
			switch(which) {
				case 'pace':
					[hours, minutes, seconds] = new Date((toSeconds(time) / distance) * 1000 * unitFactor).toISOString().substring(11, 19).replace(/^0+/, '').split(':');
					theForm['pace-minutes'].value = minutes;
					theForm['pace-seconds'].value = seconds;
					break;
				case 'time':
					[hours, minutes, seconds] = new Date((toSeconds(pace) * distance) * 1000 * unitFactor).toISOString().substring(11, 19).replace(/^0+/, '').split(':');
					theForm['hours'].value = hours;
					theForm['minutes'].value  = minutes;
					theForm['seconds'].value = seconds;
					break;
				case 'distance':
					theForm['distance'].value = (toSeconds(time) / toSeconds(pace)).toFixed(2);
					break;
				default:
			}
		}
		
	theForm.onsubmit = event => event.preventDefault();
	
	// try running parseInt() 
	const toSeconds = timeStr => +(timeStr.split(':').reduce((acc,time) => (60 * acc) + +time));

	// fill race distance field based on user choice in select element
	const selectRace = document.getElementById('race-type');
	selectRace.addEventListener('change', e => {
		if(e.target.value) theForm['distance'].value = e.target.value;
	});

})(); // end iife 
/*
 get state of Km/Mile radios and adjust calculation accordingly
 change radio if unit different in dropdown select element
 if units don't match, convert in the calculation
 */
