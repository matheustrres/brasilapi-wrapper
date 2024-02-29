import { Source } from './source';

import { HttpsClient } from '../clients/http-client';
import { type Bank } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface IBank {
	getOne(code: string): Promise<Result<Bank>>;
}

export class BrasilAPIBank extends Source implements IBank {
	async getOne(code: string): Promise<Result<Bank>> {
		const res = await HttpsClient.GET<BrasilAPIResponse<Bank>>(
			`https://brasilapi.com.br/api/banks/v1/${code}`,
		);

		return this.followUp<Bank>(res);
	}
}
