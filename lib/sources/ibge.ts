import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Municipality, type ListParams, type State } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IIBGE {
	getState(code: number | string): Promise<Result<State>>;
	listFederativeUnitMinicipalities(
		siglaUF: string,
		providers: string[],
		params?: ListParams,
	): Promise<Result<Paginator<Municipality>>>;
	listStates(params?: ListParams): Promise<Result<Paginator<State>>>;
}

/**
 * Represents the source from BrasilAPI IBGE's endpoint responses
 */
export class BrasilAPIIBGE extends Source implements IIBGE {
	protected readonly URL = 'https://brasilapi.com.br/api/ibge';

	/**
	 * Gets state information from the acronym or code
	 *
	 * @param {String | Number} code - The state acronym or code
	 * @returns {Promise<Result<State>>}
	 */
	async getState(code: string | number) {
		const res = await HttpsClient.GET<BrasilAPIResponse<State>>(
			`${this.URL}/uf/v1/${code}`,
		);

		return this.followUp(res);
	}

	/**
	 * Lists the municipalities of the federative unit
	 *
	 * @param {String} siglaUF - The acronym of the federal unit (e.g. `SP`, `RJ`, `SC`)
	 * @param {Array<String>} [providers] - The list of providers (`dados-abertos-br`, `gov`, `wikipedia`)
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<State>>>}
	 */
	async listFederativeUnitMinicipalities(
		siglaUF: string,
		providers?: string[],
		params?: ListParams,
	) {
		const activeProviders = providers?.join(',') || '';

		const res = await HttpsClient.GET<BrasilAPIResponse<Municipality[]>>(
			`${this.URL}/municipios/v1/${siglaUF}?providers=${activeProviders}`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Lists all brazilian states information
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<State>>>}
	 */
	async listStates(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<State[]>>(
			`${this.URL}/uf/v1`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
