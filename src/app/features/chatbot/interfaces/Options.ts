import { Option_type } from "./Option_type";

export interface Options{
    id: number,
    description: string,
    created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
    option_type: Option_type,
    //expanded: boolean
    //options: Option[]
}