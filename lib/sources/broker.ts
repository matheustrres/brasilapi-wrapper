import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Broker } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface IBroker {
	fetch(cnpj: string): Promise<Result<Broker>>;
}

export class BrasilAPIBroker extends Source implements IBroker {
	static #URL = 'https://brasilapi.com.br/api/cvm/corretoras/v1';

	async fetch(cnpj: string): Promise<Result<Broker>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<Broker>>(
			`${BrasilAPIBroker.#URL}/${cnpj}`,
		);

		return this.followUp<Broker>(res);
	}
}
