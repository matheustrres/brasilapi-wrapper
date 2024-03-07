import { Source } from './source';

import { makeGET } from '../clients/http-client';
import { type CEP } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { clearString } from '../utils/clear-string';

interface ICEP {
	get(cep: string, version: 'v1' | 'v2'): Promise<Result<CEP>>;
}

/**
 * Represents the source from BrasilAPI CEP's endpoint responses
 */
export class BrasilAPICEP extends Source implements ICEP {
	protected readonly URL = 'https://brasilapi.com.br/api/cep';

	/**
	 * Gets information from a Zip Code with multiple fallback providers
	 *
	 * @param {String} cep - The zip code to be fetched
	 * @param {String} [version] - The CEP endpoint version to use (defaults to `v1`)
	 * @returns {Promise<Result<CEP>>}
	 */
	async get(cep: string, version: 'v1' | 'v2' = 'v1') {
		cep = clearString(cep);

		if (!version || !['v1', 'v2'].includes(version)) {
			throw new TypeError(
				'Version is required and must evalute to "v1" or "v2"',
			);
		}

		const res = await makeGET<BrasilAPIResponse<CEP>>(
			`${this.URL}/${version}/${cep}`,
		);

		return this.followUp(res);
	}
}
