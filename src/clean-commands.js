require("dotenv").config();
const { REST, Routes } = require("discord.js");

const rest = new REST({ version: "10" }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log("🧹 Limpiando TODOS los comandos...");

    // Borrar comandos del servidor
    await rest.put(
      Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID
      ),
      { body: [] }
    );

    console.log("✅ Comandos del servidor eliminados");

    // Borrar comandos globales (por si acaso)
    await rest.put(Routes.applicationCommands(process.env.CLIENT_ID), {
      body: [],
    });

    console.log("✅ Comandos globales eliminados");
    console.log("🎯 Ahora puedes registrar comandos nuevos");
  } catch (error) {
    console.error("❌ Error:", error);
  }
})();
