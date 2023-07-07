const fs = require("fs");

// Exhibit names
const exhibitNames = [
  "Senserie",
  "Artifcats",
  "ReThink Extinct",
  "Explore You",
  "Bug Works",
  "Marvelous Earth",
  "In Motion",
  "Yum",
  "Buffalo Space",
];

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
  const randomDelayMinutes = Math.floor(Math.random() * 16) + 5;
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
//const demoData = generateDemoData(10); // Generate 10 demo items

// call generate demo datat 250 times with a random number between 7-10

var visitorsArray = [];

for (let i = 0; i < 250; i++) {
  const demoData = generateDemoData(Math.floor(Math.random() * 4) + 7);
  visitorsArray.push(demoData);
}
const jsonData = JSON.stringify(visitorsArray, null, 2);

fs.writeFileSync("demo_data.json", jsonData);
console.log("Demo data saved as demo_data.json");
