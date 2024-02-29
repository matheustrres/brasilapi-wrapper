export type BrasilAPIResponse<T> = {
	timestamp: string;
} & (
	| (T & {
			message?: never;
			type?: never;
			errors?: never;
	  })
	| (T & {
			message: string;
			type: string;
			errors?: Array<{
				name?: string;
				message: string;
				service?: string;
			}>;
	  })
);

type Success<T> = {
	data: T;
	status?: never;
};

type Failure = {
	data?: never;
	status: {
		message: string;
		type: string;
		errors?: Array<{
			name?: string;
			message: string;
		}>;
	};
};

export type Result<T> = {
	timestamp: string;
} & (Success<T> | Failure);