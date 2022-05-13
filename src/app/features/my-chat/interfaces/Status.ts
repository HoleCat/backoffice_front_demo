import { Status_type } from "./Status_type";

export interface Status{
    id: number,
    description: string,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    status_type: Status_type

}