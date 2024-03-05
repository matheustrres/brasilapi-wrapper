import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type CEP } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICEP {
	fetchV1(cep: string): Promise<Result<CEP>>;
	fetchV2(cep: string): Promise<Result<CEP>>;
}

/**
 * Represents the source from BrasilAPI CEP's endpoint responses
 */
export class BrasilAPICEP extends Source implements ICEP {
	protected readonly URL = 'https://brasilapi.com.br/api/cep';

	/**
	 * Fetches information from a Zip Code with multiple fallback providers
	 *
	 * @version 1
	 * @param {String} cep - The zip code to be fetched
	 * @returns {Promise<Result<CEP>>}
	 */
	async fetchV1(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v1/${cep}`,
		);

		return this.followUp<CEP>(res);
	}

	/**
	 * Fetches information from a Zip Code with multiple fallback providers
	 *
	 * @version 2
	 * @param {String} cep - The zip code to be fetched
	 * @returns {Promise<Result<CEP>>}
	 */
	async fetchV2(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v2/${cep}`,
		);

		return this.followUp<CEP>(res);
	}
}
