import { Document_type } from "./Document_type";
import { Status } from "./Status";

export interface User{
    id: number,
    name: string,
    last_name: string,
    userName: string,
    email: string,
    password: string,
    document_type: Document_type,
    document_number: string,
    phone: string,
    photo: string,
    status: Status,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string
}