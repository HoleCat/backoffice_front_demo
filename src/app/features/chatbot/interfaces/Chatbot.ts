import { Chatbot_question } from "./Chatbot_question";

export interface Chatbot{
    id: number,
    description: string,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    chatbot_question: Chatbot_question
}