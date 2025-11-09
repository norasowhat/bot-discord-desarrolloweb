module.exports = {
  name: "hola",
  description: "Responde con hola!",

  callback: (client, interaction) => {
    interaction.reply("hola!");
  },
};
