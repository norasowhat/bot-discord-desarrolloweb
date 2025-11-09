module.exports = (client) => {
  console.log(`${client.user.tag} is online.`);
};

const { ActivityType } = require("discord.js");

let status = [
  {
    name: "Pirro",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=BME88lS6aVY&list=RDBME88lS6aVY&start_radio=1",
  },
  {
    name: "Pirro",
    type: ActivityType.Watching,
  },
  {
    name: "Pirro",
    type: ActivityType.Listening,
  },
];

module.exports = (client) => {
  console.log(`${client.user.tag} despertó 🥳🥳`);

  setInterval(() => {
    let random = Math.floor(Math.random() * status.length);
    client.user.setActivity(status[random]);
  }, 10000);
};
