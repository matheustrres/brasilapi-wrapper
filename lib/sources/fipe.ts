import { Source } from './source';

import { makeGET } from '../clients/http-client';
import { type FIPEVehicle, type ListParams } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IFIPE {
	getVehicle(
		fipeCode: string,
		params?: ListParams,
	): Promise<Result<Paginator<FIPEVehicle>>>;
}

/**
 * Represents the source from BrasilAPI FIPE's endpoint responses
 */
export class BrasilAPIFIPE extends Source implements IFIPE {
	protected readonly URL = 'https://brasilapi.com.br/api/fipe';

	/**
	 * Gets information on a vehicle according to the FIPE table
	 *
	 * @param {String} fipeCode - The vehicle's FIPE code
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<FIPEVehicle>>>}
	 */
	async getVehicle(
		fipeCode: string,
		params?: ListParams,
	): Promise<Result<Paginator<FIPEVehicle>>> {
		const res = await makeGET<BrasilAPIResponse<FIPEVehicle[]>>(
			`${this.URL}/preco/v1/${fipeCode}`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
