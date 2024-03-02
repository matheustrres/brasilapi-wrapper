import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type ListParams, type Bank } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBank {
	fetch(code: string): Promise<Result<Bank>>;
	list(params?: ListParams): Promise<Result<Bank[]>>;
}

export class BrasilAPIBank extends Source implements IBank {
	URL = 'https://brasilapi.com.br/api/banks/v1';

	async fetch(code: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Bank>>(
			`${this.URL}/${code}`,
		);

		return this.followUp<Bank>(res);
	}

	async list(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Bank[]>>(this.URL);

		const pagin = new Paginator<Bank>(res)
			.setPage(params?.page)
			.setLimit(params?.limit)
			.take(params?.take)
			.skip(params?.skip);

		return this.followUp<Bank[]>(pagin.items);
	}
}
