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
  console.log("Error cargando los fonts .");
}

module.exports = {
  callback: async (client, interaction) => {
    if (!interaction.inGuild()) {
      interaction.reply("Este comando solo aplica para servidores.");
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
          ? `${targetUserObj.user.tag} no tiene ningún nivel. Intenta después .`
          : "No tienes ningún nivel aún. Intenta después."
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
        "Hubo un error generando la carta. Intenta después ."
      );
    }
  },

  name: "level",
  description: "Muestra el nivel",
  options: [
    {
      name: "target-user",
      description: "Elige el usuario !",
      type: ApplicationCommandOptionType.Mentionable,
    },
  ],
};
