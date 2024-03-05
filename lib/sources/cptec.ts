import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Weather, type City, type ListParams } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface ICPTEC {
	listCities(params?: ListParams): Promise<Result<Paginator<City>>>;
	listWeatherInCapitals(
		params?: ListParams,
	): Promise<Result<Paginator<Weather>>>;
	fetchCity(
		cityName: string,
		params?: ListParams,
	): Promise<Result<Paginator<City>>>;
}

export class BrasilAPICPTEC extends Source implements ICPTEC {
	protected readonly URL = 'https://brasilapi.com.br/api/cptec/v1';

	async listCities(params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<City[]>>(
			`${this.URL}/cidade`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	async listWeatherInCapitals(
		params?: ListParams,
	): Promise<Result<Paginator<Weather>>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<Weather[]>>(
			`${this.URL}/clima/capital`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}

	async fetchCity(cityName: string, params?: ListParams) {
		const res = await HttpsClient.GET<BrasilAPIResponse<City[]>>(
			`${this.URL}/cidade/${cityName}`,
		);

		return this.followUp(
			new Paginator({
				items: res,
				...params,
			}),
		);
	}
}
