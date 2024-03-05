import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type ListParams, type Broker } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBroker {
	fetch(cnpj: string): Promise<Result<Broker>>;
	list(params?: ListParams): Promise<Result<Paginator<Broker>>>;
}

/**
 * Represents the source from BrasilAPI Brokers' endpoint responses
 */
export class BrasilAPIBroker extends Source implements IBroker {
	protected readonly URL = 'https://brasilapi.com.br/api/cvm/corretoras/v1';

	/**
	 * Fetches information from a broker in the CVM archives
	 *
	 * @param {String} cnpj - The broker's CNPJ
	 * @returns {Promise<Result<Broker>>}
	 */
	async fetch(cnpj: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker>>(
			`${this.URL}/${cnpj}`,
		);

		return this.followUp<Broker>(res);
	}

	/**
	 * Lists all the brokers in the CVM archives
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<Broker>>>}
	 */
	async list(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker[]>>(this.URL);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
