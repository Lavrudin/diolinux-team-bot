const { Intents, Client } = require("discord.js");
const { prefixRedaction, prefixEditor } = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot funcionando 🤖");
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const args = message.content.split(' ').slice(1);

  if (message.content.startsWith(prefixRedaction)) {
    const postName = args.join(' ');

    if (argsSliced.length === 0) {
      message.reply({
        content: `Ops! Parece que você esqueceu de inserir argumentos 😬`,
      });
    } else if (argsSliced.length === 1) {
      message.reply({
        content: `Ops! Parece que você esqueceu de inserir o nome do artigo 😬`,
      });
    } else {
      message.reply({
        content: `${message.author} acabou  de mandar o artigo "**${postName}**" para a fila de revisão 🚀 \n\n Divirta-se, <@257316997707071491> 😁`,
      });
    }
  }

  if (message.content.startsWith(prefixEditor)) {
    const postName = args.slice(1).join(' ');

    const messages = {
      '1': `Revisão do artigo "**${postName}**" liberada ✅`,
      '2': `Revisão do artigo "**${postName}**" liberada com observações 👀`,
      '1t': `Revisão do artigo "**${postName}**" liberada ✅ \n\nAguardando thumb 🖼`,
      '2t': `Revisão do artigo "**${postName}**" liberada com observações 👀 \n\nAguardando thumb 🖼`,
      '_default': 'Ops! Parece que você esqueceu de inserir argumentos 😬'
    }

    message.reply({ content: messages[args[0]] || messages['_default'] });
  }
});

client.login(process.env.TOKEN);
