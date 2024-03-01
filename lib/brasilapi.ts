import { BrasilAPIBank } from './sources/bank';
import { BrasilAPICep } from './sources/cep';

export class BrasilAPI {
	readonly bank = new BrasilAPIBank();
	readonly cep = new BrasilAPICep();
}
