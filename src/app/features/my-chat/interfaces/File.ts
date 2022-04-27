import { NewUser } from "src/app/core/interfaces/NewUser";
import { File_type } from "./File_type";
import { User } from "./User";

export interface Files{
    description: string,
    path: string,
    user: NewUser,
    file_type: File_type,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string
}