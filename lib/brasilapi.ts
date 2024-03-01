import { BrasilAPIBank } from './sources/bank';
import { BrasilAPICEP } from './sources/cep';
import { BrasilAPICNPJ } from './sources/cnpj';

export class BrasilAPI {
	readonly bank = new BrasilAPIBank();
	readonly cep = new BrasilAPICEP();
	readonly cnpj = new BrasilAPICNPJ();
}
