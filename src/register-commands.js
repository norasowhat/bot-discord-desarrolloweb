require("dotenv").config();
const { REST, routes, Routes } = require("discord.js");

//comandos
const commands = [
  {
    name: "hola",
    description: "responde con hola!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);
//registrar los comandos
(async () => {
  try {
    console.log("registrando slash commands...");

    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: commands }
    );

    console.log("slash commands registrados");
  } catch (error) {
    console.log(`error: ${error}`);
  }
})();
