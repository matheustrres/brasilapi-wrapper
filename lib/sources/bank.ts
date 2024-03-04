import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type ListParams, type Bank } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBank {
	fetch(code: string): Promise<Result<Bank>>;
	list(params?: ListParams): Promise<Result<Paginator<Bank>>>;
}

export class BrasilAPIBank extends Source implements IBank {
	protected readonly URL = 'https://brasilapi.com.br/api/banks/v1';

	async fetch(code: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Bank>>(
			`${this.URL}/${code}`,
		);

		return this.followUp<Bank>(res);
	}

	async list(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Bank[]>>(this.URL);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
