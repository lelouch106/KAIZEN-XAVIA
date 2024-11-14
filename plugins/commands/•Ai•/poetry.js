import axios from 'axios';

const config = {
  name: "poetry",
  version: "1.0.0",
  hasPermission: 0,
  credits: "August Quinn (Converted by Rue)",
  description: "Fetch poetry by a specific author",
  usages: "<author>",
  cooldowns: 3,
};

async function onCall({ api, event, args, message }) {
  const { threadID, messageID } = message;
  const authorName = args.join(" "); // Get the author's name from the arguments

  try {
    await message.react("⏳");
    
    // Make a GET request to fetch poetry by the specified author
    const response = await axios.get(`https://poetrydb.org/author/${authorName}`);
    
    if (response.status === 200) {
      await message.react("✅");
      
      // Extract and format the poems
      const poems = response.data;
      const formattedPoems = poems.map((poem, index) => {
        return `Poem ${index + 1}:\nTitle: ${poem.title}\nLines:\n${poem.lines.join('\n')}\n---`;
      }).join('\n');
      
      global.api.sendMessage(formattedPoems, threadID, messageID);
    } else {
      await message.react("❌");
      global.api.sendMessage(`No poetry found by ${authorName}`, threadID, messageID);
    }
  } catch (error) {
    await message.react("❌");
    console.error(error);
    global.api.sendMessage(`Failed to fetch poetry by ${authorName}`, threadID, messageID);
  }
}

export default {
  config,
  onCall
};
