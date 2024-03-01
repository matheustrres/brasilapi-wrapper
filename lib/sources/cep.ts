import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type CEP } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICEP {
	fetch(cep: string): Promise<Result<CEP>>;
}

export class BrasilAPICEP extends Source implements ICEP {
	static #URL = 'https://brasilapi.com.br/api/cep/v2';

	async fetch(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${BrasilAPICEP.#URL}/${cep}`,
		);

		return this.followUp<CEP>(res);
	}
}
