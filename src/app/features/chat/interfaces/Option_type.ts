import { DecimalPipe } from "@angular/common";
import { User } from "./User";

export interface Option_type{
    id: number,
    description: string,
    created_by: User,
    created_at: string,
    updated_by: User,
    updated_at: string,
    value1: string,
    value2: number,
    value3: boolean
}