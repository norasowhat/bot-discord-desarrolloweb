const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");
const ms = require("ms");

module.exports = {
  /**
   *
   * @param {Client} client
   * @param {Interaction} interaction
   */

  callback: async (client, interaction) => {
    const mentionable = interaction.options.get("target-user").value;
    const duration = interaction.options.get("duration").value;
    const reason =
      interaction.options.get("reason")?.value || "Sin motivo proporcionado";

    await interaction.deferReply();

    const targetUser = await interaction.guild.members.fetch(mentionable);
    if (!targetUser) {
      await interaction.editReply("Ese usuario no existe en este servidor.");
      return;
    }

    if (targetUser.user.bot) {
      await interaction.editReply("No puedo aplicar timeout a un bot.");
      return;
    }

    const msDuration = ms(duration);
    if (isNaN(msDuration)) {
      await interaction.editReply("Por favor proporciona una duración válida.");
      return;
    }

    if (msDuration < 5000 || msDuration > 2.419e9) {
      await interaction.editReply(
        "La duración no puede ser menor a 5 segundos ni mayor a 28 días."
      );
      return;
    }

    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "No puedes aplicar timeout a ese usuario porque tiene un rol igual o superior al tuyo."
      );
      return;
    }

    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "No puedo aplicar timeout a ese usuario porque tiene un rol igual o superior al mío."
      );
      return;
    }

    // Timeout
    try {
      const { default: prettyMs } = await import("pretty-ms");

      if (targetUser.isCommunicationDisabled()) {
        await targetUser.timeout(msDuration, reason);
        await interaction.editReply(
          `${targetUser} tenía un timeout activo, ahora se actualizó a ${prettyMs(
            msDuration,
            {
              verbose: true,
            }
          )}\nMotivo: ${reason}`
        );
        return;
      }

      await targetUser.timeout(msDuration, reason);
      await interaction.editReply(
        `${targetUser} ha sido puesto en timeout por ${prettyMs(msDuration, {
          verbose: true,
        })}.\nMotivo: ${reason}`
      );
    } catch (error) {
      console.log(`Hubo un error al aplicar timeout: ${error}`);
    }
  },

  name: "timeout",
  description: "Aplica un timeout a un usuario.",
  options: [
    {
      name: "target-user",
      description: "El usuario al que quieres aplicar timeout.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "duration",
      description: "Duración del timeout (30m, 1h, 1 día).",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
    {
      name: "reason",
      description: "Motivo del timeout.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.MuteMembers],
  botPermissions: [PermissionFlagsBits.MuteMembers],
};
