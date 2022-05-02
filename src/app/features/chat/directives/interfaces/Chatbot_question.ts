import { Chatbot } from "./Chatbot";
import { Question } from "./Question";

export interface Chatbot_question{
    id: number,
    chatbot: Chatbot,
    question: Question
}