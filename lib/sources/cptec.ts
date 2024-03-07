import { Source } from './source';

import { makeGET } from '../clients/http-client';
import {
	type Weather,
	type City,
	type ListParams,
	type WeatherForecast,
	type OceanForecast,
} from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface ICPTEC {
	listCities(params?: ListParams): Promise<Result<Paginator<City>>>;
	listWeatherInCapitals(
		params?: ListParams,
	): Promise<Result<Paginator<Weather>>>;
	getAirportWeather(icaoCode: string): Promise<Result<Weather>>;
	getCity(
		cityName: string,
		params?: ListParams,
	): Promise<Result<Paginator<City>>>;
	getCityWeatherForecast(cityCode: number): Promise<Result<WeatherForecast>>;
	getCityOceanForecast(cityCode: number): Promise<Result<OceanForecast>>;
}

/**
 * Represents the source from BrasilAPI CPTEC's endpoint responses
 */
export class BrasilAPICPTEC extends Source implements ICPTEC {
	protected readonly URL = 'https://brasilapi.com.br/api/cptec/v1';

	/**
	 * Lists all the cities with their respective codes in the CPTEC services
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<City>>>}
	 */
	async listCities(params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<City[]>>(`${this.URL}/cidade`);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Lists the current weather conditions in the country's capitals,
	 * based on the ground stations at their airport
	 *
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<Weather>>>}
	 */
	async listWeatherInCapitals(params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<Weather[]>>(
			`${this.URL}/clima/capital`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Lists all the cities corresponding to the search term along with their
	 * respective codes in the CPTEC services
	 *
	 * @param {String} cityName - The name of the city to search for
	 * @param {ListParams} [params] - The listing parameters
	 * @param {Number} [params.itemsPerPage] - The limit of items per page
	 * @param {Number} [params.page] - The page number to start with
	 * @param {Number} [params.skip] - The amount of items to skip
	 * @param {Number} [params.take] - The amount of items to take
	 * @returns {Promise<Result<Paginator<City>>>}
	 */
	async getCity(cityName: string, params?: ListParams) {
		const res = await makeGET<BrasilAPIResponse<City[]>>(
			`${this.URL}/cidade/${cityName}`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	/**
	 * Gets current weather conditions at an airport
	 *
	 * @param {String} icaoCode - The airport ICAO code
	 * @returns {Promise<Result<Weather>>}
	 */
	async getAirportWeather(icaoCode: string) {
		const res = await makeGET<BrasilAPIResponse<Weather>>(
			`${this.URL}/clima/aeroporto/${icaoCode}`,
		);

		return this.followUp(res);
	}

	/**
	 * Gets the weather forecast for 1 day in the city entered
	 *
	 * @param {Number} cityCode - The city code
	 * @returns {Promise<Result<WeatherForecast>>}
	 */
	async getCityWeatherForecast(cityCode: number) {
		const res = await makeGET<BrasilAPIResponse<WeatherForecast>>(
			`${this.URL}/clima/previsao/${cityCode}`,
		);

		return this.followUp(res);
	}

	/**
	 * Gets the ocean forecast for 1 day in the city entered
	 *
	 * @param {Number} cityCode - The city code
	 * @returns {Promise<Result<OceanForecast>>}
	 */
	async getCityOceanForecast(cityCode: number) {
		const res = await makeGET<BrasilAPIResponse<OceanForecast>>(
			`${this.URL}/ondas/${cityCode}`,
		);

		return this.followUp(res);
	}
}
