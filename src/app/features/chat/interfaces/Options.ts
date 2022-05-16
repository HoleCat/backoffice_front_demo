import { Option_type } from "./Option_type";
import { User } from "./User";

export interface Options{
    id: number,
    description: string,
    order_number: number,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string,
    option_type: Option_type
}