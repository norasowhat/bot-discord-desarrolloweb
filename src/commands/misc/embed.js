const { EmbedBuilder } = require("discord.js");

module.exports = {
  name: "embed",
  description: "Envía un embed!",

  callback: (client, interaction) => {
    const embed = new EmbedBuilder()
      .setTitle("embed title")
      .setDescription("this is an embed description")
      .setColor("Random")
      .addFields(
        { name: "field title", value: "some random value", inline: true },
        { name: "second field title", value: "some random value", inline: true }
      );

    interaction.reply({ embeds: [embed] });
  },
};
