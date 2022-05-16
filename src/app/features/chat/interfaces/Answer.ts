import { Options } from "./Options";
import { Status } from "./Status";
import { User } from "./User";

export interface Answer {
    id: number,
	description: string,
	created_by: User,
    created_at: Date,
    updated_by: User,
    updated_at: Date,
	value1: string;
	value2: number;
	value3: boolean;
	status: Status;
	options: Options;

}