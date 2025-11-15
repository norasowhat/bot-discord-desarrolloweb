const { ActivityType } = require("discord.js");

let status = [
  {
    name: "En vivo",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=BME88lS6aVY&list=RDBME88lS6aVY&start_radio=1",
  },
  {
    name: "Reyes de las olas",
    type: ActivityType.Watching,
  },
  {
    name: "Woods, Mac Miller",
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
