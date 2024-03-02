import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type DDD } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface IDDD {
	fetch(ddd: string): Promise<Result<DDD>>;
}

export class BrasilAPIDDD extends Source implements IDDD {
	URL = 'https://brasilapi.com.br/api/ddd/v1';

	async fetch(ddd: string): Promise<Result<DDD>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<DDD>>(
			`${this.URL}/${ddd}`,
		);

		return this.followUp<DDD>(res);
	}
}
