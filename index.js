const { Intents, Client } = require("discord.js");
const { token, prefixRedaction, prefixEditor } = require("./config.json");

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on("ready", () => {
  console.log("Bot funcionando 🤖");
});

client.on("messageCreate", (msg) => {
  if (msg.content.startsWith(prefixRedaction)) {
    let args = msg.content.split(" ");
    let argsSlice = args.slice(1, 1000).join(" ");
    if (argsSlice.length === 0) {
      msg.reply({
        content: `Ops! Parece que você esqueceu dos argumentos 😬`,
      });
      if (argsSlice.length === 1) {
        msg.reply({
          content: `Ops! Parece que você esqueceu do nome do artigo 😬`,
        });
      }
    } else {
      msg.reply({
        content: `${msg.author} acabou  de mandar o artigo "**${argsSlice}**" para a fila de revisão 🚀`,
      });
    }
  }

  if (msg.content.startsWith(prefixEditor)) {
    let args = msg.content.split(" ");
    let argsSlice = args.slice(2, 1000).join(" ");
    console.log(args);
    console.log(args[1]);

    switch (args[1]) {
      case "1":
        msg.reply({
          content: `Revisão do artigo "**${argsSlice}**" liberada ✅`,
        });
        break;
      case "2":
        msg.reply({
          content: `Revisão do artigo "**${argsSlice}**" liberada com observações 👀`,
        });
        break;
      default:
        msg.reply({
          content: "Ops! Argumento inválido 😬",
        });
    }
  }
});

client.login(token);
