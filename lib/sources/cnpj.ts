import { Source } from './source';

import { makeGET } from '../clients/http-client';
import { type CNPJ } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { clearString } from '../utils/clear-string';

interface ICNPJ {
	get(cnpj: string): Promise<Result<CNPJ>>;
}

/**
 * Represents the source from BrasilAPI CNPJ's endpoint responses
 */
export class BrasilAPICNPJ extends Source implements ICNPJ {
	protected readonly URL = 'https://brasilapi.com.br/api/cnpj/v1';

	/**
	 * Gets information from a CNPJ in the Minha Receita API
	 *
	 * @param {String} cnpj - The CNPJ of a legal person
	 * @returns {Promise<Result<CNPJ>>}
	 */
	async get(cnpj: string) {
		cnpj = clearString(cnpj);

		const res = await makeGET<BrasilAPIResponse<CNPJ>>(`${this.URL}/${cnpj}`);

		return this.followUp<CNPJ>(res);
	}
}
