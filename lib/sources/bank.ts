import { Source } from './source';

import { makeGET } from '../clients/http-client';
import { type ListParams, type Bank } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBank {
	get(code: string): Promise<Result<Bank>>;
	list(params?: ListParams): Promise<Result<Paginator<Bank>>>;
}

/**
 * Represents the source from BrasilAPI Banks' endpoint responses
 */
export class BrasilAPIBank extends Source implements IBank {
	protected readonly URL = 'https://brasilapi.com.br/api/banks/v1';

	/**
	 * Gets information from a bank using a code
	 *
	 * @param {String} code - The bank code
	 * @returns {Promise<Result<Bank>>}
	 */
	async get(code: string) {
		const res = await makeGET<BrasilAPIResponse<Bank>>(`${this.URL}/${code}`);

		return this.followUp<Bank>(res);
	}

	/**
	 * Lists all banks in Brazil
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<Bank>>>}
	 */
	async list(params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<Bank[]>>(this.URL);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
