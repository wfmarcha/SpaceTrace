const fs = require("fs");

// Exhibit names
const exhibitNames = [
  "Senserie",
  "Artifacts",
  "ReThink Extinct",
  "Explore You",
  "Bug Works",
  "Marvelous Earth",
  "In Motion",
  "Yum",
  "Buffalo Space",
];

// Hot locations
const hotLocations = ["Senserie", "Artifacts", "ReThink Extinct"];

// Average time spent in hot locations (in minutes)
const hotLocationDelayMinutes = 20;

// Generate demo data for a single item
function generateDemoItem(previousExhibit, i) {
  let availableExhibits = [];
  if (previousExhibit == null) {
    availableExhibits = exhibitNames;
  } else {
    availableExhibits = exhibitNames.filter(
      (exhibit) => exhibit !== previousExhibit.loc
    );
  }

  const randomExhibitIndex = Math.floor(
    Math.random() * availableExhibits.length
  );
  const exhibit = availableExhibits[randomExhibitIndex];

  const now = new Date();
  let randomDelayMinutes = Math.floor(Math.random() * 16) + 5;

  // add extra 10-20 minutes to hot location
  if (hotLocations.includes(exhibit)) {
    randomDelayMinutes += Math.floor(Math.random() * 11) + 10;
  }

  const timestamp = new Date(
    i === 0
      ? now.getTime()
      : new Date(previousExhibit.timestamp).getTime() +
        randomDelayMinutes * 60000
  ).toUTCString();

  return {
    loc: exhibit,
    timestamp: timestamp,
  };
}

// Generate demo data array
function generateDemoData(numItems) {
  const demoData = [];
  let previousExhibit = null;

  for (let i = 0; i < numItems; i++) {
    const demoItem = generateDemoItem(previousExhibit, i);
    demoData.push(demoItem);
    previousExhibit = demoItem;
  }

  lastLoc = demoData[demoData.length - 1];
  const randomDelayMinutes = Math.floor(Math.random() * 16) + 5;

  demoData.push({
    loc: "Exit",
    timestamp: new Date(
      new Date(lastLoc.timestamp).getTime() + randomDelayMinutes * 60000
    ).toUTCString(),
  });

  return demoData;
}

// Generate the demo data
var visitorsArray = [];

for (let i = 0; i < 250; i++) {
  const demoData = generateDemoData(Math.floor(Math.random() * 4) + 7);
  visitorsArray.push(demoData);
}

const jsonData = JSON.stringify(visitorsArray, null, 2);

fs.writeFileSync("demo_data.json", jsonData);
console.log("Demo data saved as demo_data.json");
