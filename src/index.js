require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  EmbedBuilder,
  ActivityType,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

let status = [
  {
    name: "Pirro",
    type: ActivityType.Streaming,
    url: "https://www.youtube.com/watch?v=BME88lS6aVY&list=RDBME88lS6aVY&start_radio=1",
  },
];
// Mensaje para avisar que el bot está listo
client.on(Events.ClientReady, (c) => {
  console.log(`${c.user.tag} despertó 🥳🥳`);
  client.user.setActivity();
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

  if (interaction.commandName === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("embed title")
      .setDescription("this is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "second field title",
          value: "some random value",
          inline: true,
        }
      );

    interaction.reply({ embeds: [embed] });
  }
});

client.on("messageCreate", (message) => {
  if (message.content === "embed") {
    const embed = new EmbedBuilder()
      .setTitle("embed title")
      .setDescription("this is an embed description")
      .setColor("Random")
      .addFields(
        {
          name: "field title",
          value: "some random value",
          inline: true,
        },
        {
          name: "second field title",
          value: "some random value",
          inline: true,
        }
      );
    message.channel.send({ embeds: [embed] });
  }
});

client.on("interactionCreate", async (interaction) => {
  try {
    if (!interaction.isButton()) return;

    await interaction.deferReply({ ephemeral: true });

    const role = interaction.guild.roles.cache.get(interaction.customId);
    if (!role) {
      interaction.editReply({
        content: "no encontré ese rol...",
      });
      return;
    }

    const hasRole = interaction.member.roles.cache.has(role.id);

    if (hasRole) {
      await interaction.member.roles.remove(role);
      await interaction.editReply(`el rol ${role} ha sido removido.`);
      return;
    }

    await interaction.member.roles.add(role);
    await interaction.editReply(`el rol ${role} ha sido agregado.`);
  } catch (error) {
    console.log(error);
  }
});
client.login(process.env.TOKEN);
