import { type BrasilAPIResponse, type Result } from '../typings/result';

export abstract class Source {
	protected abstract readonly URL: string;

	protected followUp<T>(res: BrasilAPIResponse<T>): Result<T> {
		const timestamp = new Date().toISOString();

		if (res.message && res.type) {
			return {
				timestamp,
				status: res,
			};
		}

		return {
			timestamp,
			data: res,
		};
	}
}
