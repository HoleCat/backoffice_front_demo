import { Chat } from "./Chat";
import { Status } from "./Status";

export interface Message{
    id: number,
    chat: Chat,
    message: string,
    photo: string,
    path: string,
    status: Status,
    created_by: number,
    created_at: Date,
    updated_by: number,
    updated_at: Date
}