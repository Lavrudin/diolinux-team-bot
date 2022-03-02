const { Intents, Client } = require("discord.js");
const { prefixRedaction, prefixEditor } = require("./config.json");
require("dotenv").config();

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot funcionando 🤖");
});

client.on("messageCreate", (msg) => {
  if (msg.author.bot) return;

  if (msg.content.startsWith(prefixRedaction)) {
    let args = msg.content.split(" ");
    let argsSliced = args.slice(1).join(" ");

    if (argsSliced.length === 0) {
      msg.reply({
        content: `Ops! Parece que você esqueceu de inserir argumentos 😬`,
      });
    } else if (argsSliced.length === 1) {
      msg.reply({
        content: `Ops! Parece que você esqueceu de inserir o nome do artigo 😬`,
      });
    } else {
      msg.reply({
        content: `${msg.author} acabou  de mandar o artigo "**${argsSliced}**" para a fila de revisão 🚀 \n\n Divirta-se, <@257316997707071491> 😁`,
      });
    }
  }

  if (msg.content.startsWith(prefixEditor)) {
    let args = msg.content.split(" ");
    let argsSliced = args.slice(2).join(" ");

    switch (args[1]) {
      case "1":
        msg.reply({
          content: `Revisão do artigo "**${argsSliced}**" liberada ✅`,
        });
        break;
      case "2":
        msg.reply({
          content: `Revisão do artigo "**${argsSliced}**" liberada com observações 👀`,
        });
        break;
      case "1t":
        msg.reply({
          content: `Revisão do artigo "**${argsSliced}**" liberada ✅ \n\nAguardando thumb 🖼`,
        });
        break;
      case "2t":
        msg.reply({
          content: `Revisão do artigo "**${argsSliced}**" liberada com observações 👀 \n\nAguardando thumb 🖼`,
        });
        break;
      default:
        msg.reply({
          content: "Ops! Parece que você esqueceu de inserir argumentos 😬",
        });
    }
  }
});

client.login(process.env.TOKEN);
