import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type CEP } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICEP {
	fetchV1(cep: string): Promise<Result<CEP>>;
	fetchV2(cep: string): Promise<Result<CEP>>;
}

export class BrasilAPICEP extends Source implements ICEP {
	protected readonly URL = 'https://brasilapi.com.br/api/cep';

	async fetchV1(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v1/${cep}`,
		);

		return this.followUp<CEP>(res);
	}

	async fetchV2(cep: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CEP>>(
			`${this.URL}/v2/${cep}`,
		);

		return this.followUp<CEP>(res);
	}
}
