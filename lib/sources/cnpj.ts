import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type CNPJ } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface ICNPJ {
	fetch(cnpj: string): Promise<Result<CNPJ>>;
}

export class BrasilAPICNPJ extends Source implements ICNPJ {
	URL = 'https://brasilapi.com.br/api/cnpj/v1';

	async fetch(cnpj: string) {
		const res = await HttpsClient.GET<BrasilAPIResponse<CNPJ>>(
			`${this.URL}/${cnpj}`,
		);

		return this.followUp<CNPJ>(res);
	}
}
