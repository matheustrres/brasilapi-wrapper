import { BrasilAPIBank } from './sources/bank';
import { BrasilAPICEP } from './sources/cep';

export class BrasilAPI {
	readonly bank = new BrasilAPIBank();
	readonly cep = new BrasilAPICEP();
}
