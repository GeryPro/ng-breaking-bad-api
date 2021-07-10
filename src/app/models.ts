export interface APIResponse<T> {
	results: Array<T>;
}

export interface Character {
	char_id: number;
	name: string;
	birthday: string;
	occupation: Array<string>;
	img: string;
	status: string;
	appearance: Array<number>;
	nickname: string;
	portrayed: string;
}
