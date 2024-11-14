import axios from 'axios';

const config = {
  name: "catgpt",
  version: "1.0.0",
  hasPermission: 0,
  credits: "Minn (Converted by Grim", //don't change, explore explore din mga site/apis jan, wag puro chage credits
  description: "Chat with catgpt",
  usages: "<text>",
  cooldowns: 3,
};

async function onCall({ api, event, args, message }) {
  const { threadID, messageID } = message;
  const q = args.join(" ");
  try {
    await message.react("⏳");
    const response = await axios.post("https://catgpt.guru/api/chat", {
      messages: [
        {
          role: "user",
          content: q,
        },
      ],
    });
    await message.react("✅");
    global.api.sendMessage(response.data, threadID, messageID);
  } catch (error) {
    await message.react("❌")
    console.error(error);
    global.api.sendMessage('Catgpt didn\'t meow back.', threadID, messageID);
  }
};

export default {
  config,
  onCall
}