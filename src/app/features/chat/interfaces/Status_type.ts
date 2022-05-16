import { User } from "./User";

export interface Status_type{
    id: number,
    description: string,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string
}