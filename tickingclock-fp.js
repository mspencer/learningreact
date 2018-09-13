const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);

const compose = (...fns) =>
	(arg) =>
		fns.reduce(
    	(composed, f) => f(composed),
      arg
    )
    
// takes a date object and returns a clock time object that contains hours, minutes and seconds
const serializeClockTime = date =>
	({
  	hours: date.getHours(),
    minutes: date.getMinutes(),
    seconds: date.getSeconds()
  });

// takes the clock time object and returns an object where hours are converted to civilian time
const civilianHours = clockTime =>
	({
  	...clockTime,
    hours: (clockTime.hours > 12) ? clockTime.hours - 12 : clockTime.hours
  });

// takes the clock time object and appends time of da, AM or PM, to that object
const appendAMPM = clockTime =>
	({
  	...clockTime,
    ampm: (clockTime.hours >= 12) ? "PM" : "AM"
  });

// takes a target function and returns a function that will send a time to the target
const display = target => time => target(time);

// takes a template string and uses it to return clock time formatted
const formatClock = format => 
	time => 
  	format.replace("hh", time.hours)
    			.replace("mm", time.minutes)
          .replace("ss", time.seconds)
          .replace("tt", time.ampm);

// takes and object's key as an argument and prepends a zero the the value stored under that object key
const prependZero = key => clockTime =>
	({
  	...clockTime,
    [key]: (clockTime[key] < 10) ? "0" + clockTime[key] : clockTime[key]
  });

/* Compose functions */
// takes clockTime as an argument and transforms it into civilian time 
const convertToCivilianTime = clockTime =>
	compose(
  	appendAMPM,
    civilianHours
  )(clockTime);

// takes civilian clock time and makes sure the hours, minutes and seconds display double digits
const doubleDigits = civilianTime =>
	compose(
  	prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(civilianTime)

// starts the clock by setting an interval that will invoke a callback every second
const startTicking = () =>
	setInterval(
  	compose(
    	clear,
      getCurrentTime,
      serializeClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock("hh:mm:ss tt"),
      display(log)
    ),
    oneSecond()
  )
  
startTicking();