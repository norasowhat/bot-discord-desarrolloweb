const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "suma",
  description: "Suma dos números",
  options: [
    {
      name: "primer-numero",
      description: "primer número",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
    {
      name: "segundo-numero",
      description: "segundo número",
      type: ApplicationCommandOptionType.Number,
      required: true,
    },
  ],

  callback: (client, interaction) => {
    const num1 = interaction.options.get("primer-numero").value;
    const num2 = interaction.options.get("segundo-numero").value;
    interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
  },
};
