import { Question_type } from "./Question_type";
import { Status } from "./Status";

export interface Question{
    id: number,
    description: string,
    order_number: number,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    question_type: Question_type,
    status: Status
}