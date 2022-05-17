import { Status } from "src/app/features/chat/interfaces/Status";
import { User } from "src/app/features/chat/interfaces/User";
import { Document_type } from "./Document_type";

export class UserData{
    id: number;
    user: User;
    document_type: Document_type;
    status: Status;
    created_by: User;
    updated_by: User;
}