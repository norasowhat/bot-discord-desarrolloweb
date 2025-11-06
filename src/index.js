require('dotenv').config();

const {Client, IntentsBitField} = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ],
}) 


console.log('Token cargado:', process.env.TOKEN);
//mensaje para avisar que el bot esta listo una vez iniciado con nodemon
client.on('ready', (c) => {
    console.log(`${c.user.tag} despertó 🥳🥳`);
});

//trigger para que el bot vea los mensajes
client.on('messageCreate', (message) => {
    //hacer que el bot no se responda a sí mismo
    if(message.author.bot){
        return;
    }
    if(message.content === 'hola'){
        message.reply('callate');
    }
});


client.login(process.env.TOKEN);