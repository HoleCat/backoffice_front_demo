import { Chat } from "./Chat";
import { Status } from "./Status";
import { User } from "./User";

export interface Message{
    id: number,
    chat: Chat,
    message: string,
    photo: string,
    path: string,
    status: Status,
    created_by: User,
    created_at: Date,
    updated_by: User,
    updated_at: Date
}