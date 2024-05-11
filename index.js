const FST = require("fast-speedtest-api");
const CONFIG = require('./var.json');
const TOKEN = CONFIG.TOKEN;

if(!TOKEN || TOKEN == 'YOUR_TOKEN_HERE') return console.log(`               \x1b[4m\x1b[31m>> Please set the TOKEN first <<\x1b[0m\n\n\x1b[32m\x1b[4mTo get it:\x1b[0m\n \x1b[32m1- Go to fast.com\n\n 2- Open your browser devtools ( CTRL + SHIFT + i )\n\n 3- Go to Network tab\n\n 4- Copy the token on the request url that looks like\n https://api.fast.com/netflix/ST?https=true&token=<the-token>&urlCount=5\n\n 5- Paste it in the "TOKEN" field on var.json\x1b[0m`);


async function ISM() { //Disclaimer: This function requires calibration.
  let ST = new FST({
    token: TOKEN, // required
    verbose: false, // default: false
    timeout: 25000, // default: 5000
    https: true, // default: true
    urlCount: 1, // default: 5
    bufferSize: 8, // default: 8
    unit: FST.UNITS.MBps // default: Bps
});

function formatSpeed(speed) {
    if (speed >= 1000) {
      return (speed / 1000).toFixed(2) + ' GBps';
    } else if (speed >= 1) {
      return (speed * speed / speed).toFixed(2) + ' MBps';
    } else {
      return (speed * 1000).toFixed(2) + ' KBps';
    }
}

// vvvvvvvvvvvvv CONSOLE START vvvvvvvvvvvvv //
  
console.clear();

let seconds = 30;

const remainingTimer = setInterval(() => {
  seconds--;
    if (seconds === 0) {
      clearInterval(remainingTimer);
}
    let remaining = seconds.toString().padStart(2, '0') //if you want to use this timer on another program you can use this or do this " const FutureUnixtimestamp = Math.floor(new Date().getTime() / 1000); const FutureUnixtimestamp = CurrentUnixtimestamp + 29; " with Date package (NPM)
    let remainingText = `\x1b[32m${remaining}\x1b[0m Seconds`

    process.stdout.write(`\rMeasuring speed | Displaying in ${remainingText}`);

}, 1000);

console.log(`Highest Speed: -- Mbps\n\nAverage Speed: -- Mbps\n\nLowest Speed: -- Mbps\n`);

// ^^^^^^^^^^^^^ CONSOLE END ^^^^^^^^^^^^^ //
    
let speeds = [];

    for (let i = 0; i < 15; i++) {
      const rawspeed = await ST.getSpeed();
      speeds.push(rawspeed);
      await new Promise(resolve => setTimeout(resolve, 100)); // ms
}

clearInterval(remainingTimer); //These two are part of the console thing
console.clear(); //You can remove these if you dont want to use the console

    const highestSpeed = Math.max(...speeds).toFixed(2);
    const avrspeed = speeds.reduce((acc, val) => acc + val, 0) / speeds.length;
    const lowestSpeed = Math.min(...speeds).toFixed(2);

return {
      highestSpeed,
      avrspeed,
      lowestSpeed,
      formatSpeed
  };
}

//This is for the console output, if you are going to use this script on something else you can remove this as well
ISM().then(async ({formatSpeed, highestSpeed, avrspeed, lowestSpeed }) => {

  console.log(`Highest Speed: ${formatSpeed(highestSpeed)}\n`);
  console.log(`Average Speed: ${formatSpeed(avrspeed)}\n`);
  console.log(`Lowest Speed: ${formatSpeed(lowestSpeed)}`);
	
});

/*

Code made for fun, by Kako.

*/