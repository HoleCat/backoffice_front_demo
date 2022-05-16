import { Options } from "./Options";
import { Question_type } from "./Question_type";
import { Status } from "./Status";
import { User } from "./User";

export interface Question{
    id: number,
    description: string,
    order_number: number,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string,
    question_type: Question_type,
    status: Status,
    options: Options[]
}