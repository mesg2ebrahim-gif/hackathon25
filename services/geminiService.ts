
import { GoogleGenAI, GenerateContentResponse, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export class GeminiService {
  private chat: Chat;

  constructor() {
    this.chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      const response: GenerateContentResponse = await this.chat.sendMessage({ message });
      return response.text || "I'm sorry, I couldn't process that.";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "There was an error communicating with the AI. Please try again later.";
    }
  }

  async generateFAQAnswer(question: string): Promise<string> {
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Provide a professional answer for a student asking this: "${question}" about Saylani Welfare training programs.`,
        config: { systemInstruction: SYSTEM_INSTRUCTION }
      });
      return response.text || "Contact our support line for details.";
    } catch (error) {
      return "Consult the main campus for this specific information.";
    }
  }
}

export const geminiService = new GeminiService();
