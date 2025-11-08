require("dotenv").config();

const {
  Client,
  Events,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const roles = [
  {
    id: "1436542271985025065",
    label: "ratón",
  },
  {
    id: "1436542577179496478",
    label: "liebre",
  },
  {
    id: "1436542624830984334",
    label: "oso",
  },
  {
    id: "1436542701964365896",
    label: "pato",
  },
  {
    id: "1436542741080440884",
    label: "pez",
  },
];
// Mensaje para avisar que el bot está listo
client.on(Events.ClientReady, async (c) => {
  try {
    const channel = await client.channels.cache.get("1435816895537483999");
    if (!channel) return;

    const row = new ActionRowBuilder();

    roles.forEach((role) => {
      row.components.push(
        new ButtonBuilder()
          .setCustomId(role.id)
          .setLabel(role.label)
          .setStyle(ButtonStyle.Primary)
      );
    });

    await channel.send({
      content: "reclama o remueve un rol abajo.",
      components: [row],
    });

    process.exit();
  } catch (error) {
    console.log(error);
  }
});

client.login(process.env.TOKEN);
