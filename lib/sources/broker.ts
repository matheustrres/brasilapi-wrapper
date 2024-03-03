import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type ListParams, type Broker } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBroker {
	fetch(cnpj: string): Promise<Result<Broker>>;
	list(params?: ListParams): Promise<Result<Paginator<Broker>>>;
}

export class BrasilAPIBroker extends Source implements IBroker {
	protected readonly URL = 'https://brasilapi.com.br/api/cvm/corretoras/v1';

	async fetch(cnpj: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker>>(
			`${this.URL}/${cnpj}`,
		);

		return this.followUp<Broker>(res);
	}

	async list(params?: ListParams | undefined) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker[]>>(this.URL);

		return this.followUp(
			new Paginator({
				items: res,
				itemsPerPage: params?.limit || 20,
				skip: params?.skip,
				take: params?.take,
			}),
		);
	}
}
