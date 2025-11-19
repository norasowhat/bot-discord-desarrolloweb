const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const targetUserId = interaction.options.get("target-user").value;
    const reason = interaction.options.get("reason")?.value || "Sin motivo...";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(targetUserId);

    if (!targetUser) {
      await interaction.editReply("El usuario no  existe en el servidor.");
      return;
    }

    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply("No se puede expulsar al admin.");
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "No puedes expulsar a este usuario proque tiene mismo/mayor rol que tú."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "No puedes expulsar a este usuario proque tiene mismo/mayor rol que yo."
      );
      return;
    }

    try {
      await targetUser.kick(reason);
      await interaction.editReply(
        `Usuario ${targetUser} fue expulsado\nMotivo: ${reason}`
      );
    } catch (error) {
      console.log(`Hubo un error: ${error}`);
    }
  },

  name: "kick",
  description: "Expulsa a un usuario..",
  options: [
    {
      name: "target-user",
      description: "Usuario a expulsar.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "Motivo.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.KickMembers],
  botPermissions: [PermissionFlagsBits.KickMembers],
};
