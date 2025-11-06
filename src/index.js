require("dotenv").config();

const { Client, Events, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Mensaje para avisar que el bot está listo
client.on(Events.ClientReady, (c) => {
  console.log(`${c.user.tag} despertó 🥳🥳`);
});

client.on(Events.InteractionCreate, (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === "hola") {
    interaction.reply("hola!");
  }

  if (interaction.commandName === "ping") {
    interaction.reply("pong!");
  }

  if (interaction.commandName === "suma") {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;

    interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
  }
});

client.login(process.env.TOKEN);
