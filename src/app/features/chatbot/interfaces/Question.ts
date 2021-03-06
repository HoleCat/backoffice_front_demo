import { Question_type } from "./Question_type";
import { Status } from "./Status";

export interface Question{
    id: number,
    description: string,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    order_number: number,
    status: Status,
    question_type: Question_type,
    //expanded: boolean
    //options: Option[]
}