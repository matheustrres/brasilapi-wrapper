import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Municipality, type ListParams } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IIBGE {
	listFederativeUnitMinicipalities(
		siglaUF: string,
		providers: string[],
		params?: ListParams,
	): Promise<Result<Paginator<Municipality>>>;
}

export class BrasilAPIIBGE extends Source implements IIBGE {
	protected readonly URL = 'https://brasilapi.com.br/api/ibge';

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
}
