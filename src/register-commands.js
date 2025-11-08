require("dotenv").config();
const { REST, Routes, ApplicationCommandOptionType } = require("discord.js");

// Comandos
const commands = [
  {
    name: "hola",
    description: "responde con hola!",
  },
  {
    name: "ping",
    description: "pong!",
  },
  {
    name: "suma",
    description: "adds two numbers",
    options: [
      {
        name: "first-number",
        description: "primer número",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
      {
        name: "second-number",
        description: "segundo número",
        type: ApplicationCommandOptionType.Number,
        required: true,
      },
    ],
  },
  {
    name: "embed",
    description: "send an embed!",
  },
];

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

// Registrar los comandos
(async () => {
  try {
    console.log("Registrando slash commands...");

    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: commands }
    );

    console.log("Slash commands registrados correctamente");
  } catch (error) {
    console.error(`Error al registrar comandos: ${error}`);
  }
})();
