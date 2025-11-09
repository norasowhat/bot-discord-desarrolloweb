const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "suma",
  description: "Suma dos números",
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

  callback: (client, interaction) => {
    const num1 = interaction.options.get("first-number").value;
    const num2 = interaction.options.get("second-number").value;
    interaction.reply(`${num1} + ${num2} = ${num1 + num2}`);
  },
};
