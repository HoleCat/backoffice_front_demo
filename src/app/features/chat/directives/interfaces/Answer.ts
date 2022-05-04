import { Options } from "./Options";
import { Status } from "./Status";

export interface Answer {
    id: number,
	description: string,
	created_by: number,
    created_at: string,
    updated_by: number,
    updated_at: string,
	value1: string;
	value2: number;
	value3: boolean;
	status: Status;
	options: Options;

}