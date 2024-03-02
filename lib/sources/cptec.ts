import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type City, type ListParams } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface ICPTEC {
	listCities(params?: ListParams): Promise<Result<City[]>>;
}

export class BrasilAPICPTEC extends Source implements ICPTEC {
	URL = 'https://brasilapi.com.br/api/cptec/v1';

	async listCities(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<City[]>>(
			`${this.URL}/cidade`,
		);

		const pagin = new Paginator<City>(res)
			.setPage(params?.page)
			.setLimit(params?.limit)
			.take(params?.take)
			.skip(params?.skip);

		return this.followUp<City[]>(pagin.items);
	}
}
