import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Cep } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICep {
	fetch(cep: string): Promise<Result<Cep>>;
}

export class BrasilAPICep extends Source implements ICep {
	static #URL = 'https://brasilapi.com.br/api/cep/v2';

	async fetch(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<Cep>>(
			`${BrasilAPICep.#URL}/${cep}`,
		);

		return this.followUp<Cep>(res);
	}
}
