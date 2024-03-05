import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type DDD } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface IDDD {
	fetch(ddd: string): Promise<Result<DDD>>;
}

/**
 * Represents the source from BrasilAPI DDD's endpoint responses
 */
export class BrasilAPIDDD extends Source implements IDDD {
	protected readonly URL = 'https://brasilapi.com.br/api/ddd/v1';

	/**
	 * Fetches state and list of cities by area code
	 *
	 * @param {String} ddd - The area code to be fetched
	 * @returns {Promise<Result<DDD>>}
	 */
	async fetch(ddd: string): Promise<Result<DDD>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<DDD>>(
			`${this.URL}/${ddd}`,
		);

		return this.followUp<DDD>(res);
	}
}
