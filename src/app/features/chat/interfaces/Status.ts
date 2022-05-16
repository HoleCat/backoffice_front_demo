import { Status_type } from "./Status_type";
import { User } from "./User";

export interface Status{
    id: number,
    description: string,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string,
    status_type: Status_type

}