import { User } from "./User";

export interface Document_type{
    id: number,
    description: string,
    short_description: string,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string
}