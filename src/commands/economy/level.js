const {
  ApplicationCommandOptionType,
  AttachmentBuilder,
} = require("discord.js");
const { RankCardBuilder, Font } = require("canvacord");
const calculateLevelXp = require("../../utils/calculateLevelXp");
const Level = require("../../models/Level");

// Cargar una fuente por defecto
try {
  Font.loadDefault();
} catch (error) {
  console.log("Error loading default fonts, continuing anyway...");
}

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("You can only run this command inside a server.");
      return;
    }

    await interaction.deferReply();

    const mentionedUserId = interaction.options.get("target-user")?.value;
    const targetUserId = mentionedUserId || interaction.member.id;
    const targetUserObj = await interaction.guild.members.fetch(targetUserId);

    const fetchedLevel = await Level.findOne({
      userId: targetUserId,
      guildId: interaction.guild.id,
    });

    if (!fetchedLevel) {
      interaction.editReply(
        mentionedUserId
          ? `${targetUserObj.user.tag} doesn't have any levels yet. Try again when they chat a little more.`
          : "You don't have any levels yet. Chat a little more and try again."
      );
      return;
    }

    let allLevels = await Level.find({ guildId: interaction.guild.id }).select(
      "-_id userId level xp"
    );

    allLevels.sort((a, b) => {
      if (a.level === b.level) {
        return b.xp - a.xp;
      } else {
        return b.level - a.level;
      }
    });

    let currentRank =
      allLevels.findIndex((lvl) => lvl.userId === targetUserId) + 1;

    try {
      // Crear la tarjeta de nivel usando el nuevo constructor
      const card = new RankCardBuilder()
        .setUsername(targetUserObj.user.username)
        .setDisplayName(
          targetUserObj.user.displayName || targetUserObj.user.username
        )
        .setAvatar(targetUserObj.user.displayAvatarURL({ size: 256 }))
        .setCurrentXP(fetchedLevel.xp)
        .setRequiredXP(calculateLevelXp(fetchedLevel.level))
        .setLevel(fetchedLevel.level)
        .setRank(currentRank)
        .setStatus(targetUserObj.presence?.status || "offline");

      // Construir la imagen
      const data = await card.build({
        format: "png",
      });

      const attachment = new AttachmentBuilder(data);
      await interaction.editReply({ files: [attachment] });
    } catch (error) {
      console.error("Error generating level card:", error);
      await interaction.editReply(
        "There was an error generating the level card. Please try again later."
      );
    }
  },

  name: "level",
  description: "Shows your/someone's level.",
  options: [
    {
      name: "target-user",
      description: "The user whose level you want to see.",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
