import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type CEP } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICEP {
	getV1(cep: string): Promise<Result<CEP>>;
	getV2(cep: string): Promise<Result<CEP>>;
}

/**
 * Represents the source from BrasilAPI CEP's endpoint responses
 */
export class BrasilAPICEP extends Source implements ICEP {
	protected readonly URL = 'https://brasilapi.com.br/api/cep';

	/**
	 * Gets information from a Zip Code with multiple fallback providers
	 *
	 * @version 1
	 * @param {String} cep - The zip code to be fetched
	 * @returns {Promise<Result<CEP>>}
	 */
	async getV1(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v1/${cep}`,
		);

		return this.followUp<CEP>(res);
	}

	/**
	 * Gets information from a Zip Code with multiple fallback providers
	 *
	 * @version 2
	 * @param {String} cep - The zip code to be fetched
	 * @returns {Promise<Result<CEP>>}
	 */
	async getV2(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v2/${cep}`,
		);

		return this.followUp<CEP>(res);
	}
}
