import { Source } from './source';

import { makeGET } from '../clients/http-client';
import {
	type Vehicle,
	type ListParams,
	type ReferenceTable,
	type VehicleType,
	type VehicleBrand,
} from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IFIPE {
	getVehicle(
		fipeCode: string,
		params?: ListParams,
	): Promise<Result<Paginator<Vehicle>>>;
	listReferenceTables(
		params?: ListParams,
	): Promise<Result<Paginator<ReferenceTable>>>;
	listVehicleBrandsByType(
		vehicleType?: VehicleType,
		params?: ListParams,
		referenceTable?: number,
	): Promise<Result<Paginator<VehicleBrand>>>;
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
	 * @returns {Promise<Result<Paginator<Vehicle>>>}
	 */
	async getVehicle(fipeCode: string, params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<Vehicle[]>>(
			`${this.URL}/preco/v1/${fipeCode}`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Lists the existing reference tables
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<ReferenceTable>>>}
	 */
	async listReferenceTables(params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<ReferenceTable[]>>(
			`${this.URL}/tabelas/v1`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Lists vehicle brands according to vehicle type
	 *
	 * @param {VehicleBrand} [vehicleType] - The vehicle type to search for
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @param {Number} [referenceTable] - The reference table code
	 * @returns {Promise<Result<Paginator<VehicleBrand>>>}
	 */
	async listVehicleBrandsByType(
		vehicleType?: VehicleType,
		params?: ListParams,
		referenceTable?: number,
	) {
		let url = `${this.URL}/marcas/v1/${vehicleType}`;

		if (referenceTable) {
			url += `?tabela_referencia=${referenceTable}`;
		}

		const res = await makeGET<BrasilAPIResponse<VehicleBrand[]>>(url);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
