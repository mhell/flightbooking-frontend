import axios from "axios";

const API_URL = "http://localhost:8080/api/flights/assistant";

export const flightBookingService = {
  chat: async (chatId, message) => {
    try {
      const response = await axios.post(API_URL, {
        chatId: chatId,
        message: message
      });
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
};
