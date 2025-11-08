import { StreamChat } from "stream-chat";
import "dotenv/config";

const apiKey = process.env.STREAM_API_KEY;
const secretApiKey = process.env.STREAM_API_SECRET;

if (!apiKey || !secretApiKey) {

}

const streamClient = StreamChat.getInstance(apiKey, secretApiKey);

export const upsertStreamUser = async (userData) => {
  try {
    await streamClient.upsertUser(userData);
    return userData;
  } catch (error) {

  }
};

export const generateStreamToken = (userId) => {
  try {
    const userIdStr = userId.toString();
    return streamClient.createToken(userIdStr);
  } catch (error) {

  }
};
