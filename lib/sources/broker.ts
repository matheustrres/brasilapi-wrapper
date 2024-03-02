import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type ListParams, type Broker } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';
import { Paginator } from '../utils/paginator';

interface IBroker {
	fetch(cnpj: string): Promise<Result<Broker>>;
	list(params?: ListParams): Promise<Result<Broker[]>>;
}

export class BrasilAPIBroker extends Source implements IBroker {
	static #URL = 'https://brasilapi.com.br/api/cvm/corretoras/v1';

	async fetch(cnpj: string): Promise<Result<Broker>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker>>(
			`${BrasilAPIBroker.#URL}/${cnpj}`,
		);

		return this.followUp<Broker>(res);
	}

	async list(params?: ListParams | undefined): Promise<Result<Broker[]>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker[]>>(
			BrasilAPIBroker.#URL,
		);

		const pagin = new Paginator<Broker>(res)
			.setPage(params?.page)
			.setLimit(params?.limit)
			.take(params?.take)
			.skip(params?.skip);

		return this.followUp<Broker[]>(pagin.items);
	}
}
