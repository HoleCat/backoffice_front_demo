import { Status } from "./Status";
import { User } from "./User";

export interface Chat {
    id: number,
    topic: string,
    description: string,
    status: Status,
    user: User,
    sender_name: string,
    receive_name: string,
    created_by: number,
    created_at: Date,
    updated_by: number,
    updated_at: Date
}