import { Question } from "./Question";
import { Status } from "./Status";
import { User } from "./User";

export interface Chatbot{
    id: number,
    topic: string,
    description: string,
    status: Status,
    user: User,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    questions: Question[]
}