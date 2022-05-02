import { Status } from "../../chatbot/interfaces/Status";
import { Chat } from "./Chat";


export interface Message{
    id: number,
    chat: Chat,
    message: string,
    photo: string,
    path: string,
    status3: Status,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string
}