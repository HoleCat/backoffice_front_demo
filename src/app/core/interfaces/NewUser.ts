import { Status } from "src/app/features/chatbot/interfaces/Status";
import { Document_type } from "./Document_type";

export class NewUser{
    id: number;
    name: string;
    last_name: string;
    userName: string;
    email: string;
    password: string;
    document_number: string;
    phone: string;
    photo: string;
    created_by: number;
    created_at: string;
    updated_by: number;
    updated_at: string;
    document_type: Document_type;
    status: Status;
}