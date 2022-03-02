const { Intents, Client } = require("discord.js");
const { prefixRedaction, prefixEditor } = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot funcionando 🤖");
});

client.on("messageCreate", (message) => {
  // Ignores bot messages
  if (message.author.bot) return;

  // Ignores commandName and extract arguments
  const args = message.content.split(' ').slice(1);

  if (message.content.startsWith(prefixRedaction)) {
    const postName = args.join(' ');

    if (args.length === 0) {
      return message.reply({ content: `Ops! Parece que você esqueceu de inserir o nome do artigo 😬` });
    }

    return message.reply({
      content: `${message.author} acabou  de mandar o artigo "**${postName}**" para a fila de revisão 🚀 \n\n Divirta-se, <@257316997707071491> 😁`,
    });
  }

  if (message.content.startsWith(prefixEditor)) {
    const commandAction = args[0];
    const postName = args.slice(1).join(' ');
    
    if (args.length < 2) {
      return message.reply({
        content: `Por favor insira a ação do comando e o nome do artigo. Ex: ${prefixEditor} 2t O que é No-Code e Low-Code? 😁`,
      });
    }
    
    const messages = {
      '1': `Revisão do artigo "**${postName}**" liberada ✅`,
      '2': `Revisão do artigo "**${postName}**" liberada com observações 👀`,
      '1t': `Revisão do artigo "**${postName}**" liberada ✅ \n\nAguardando thumb 🖼`,
      '2t': `Revisão do artigo "**${postName}**" liberada com observações 👀 \n\nAguardando thumb 🖼`,
      '_default': 'Ops! O argumento que você informou é inválido. 😬'
    };

    return message.reply({ content: messages[commandAction] || messages['_default'] });
  }
});

client.login(process.env.TOKEN);
