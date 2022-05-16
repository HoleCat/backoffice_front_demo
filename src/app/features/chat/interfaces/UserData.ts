import { Document_type } from "./Document_type";
import { Status } from "./Status";
import { User } from "./User";

export interface UserData{
    id: number,
    user: User,
    document_type: Document_type,
    status: Status,
    created_by: User,
    updated_by: User
}