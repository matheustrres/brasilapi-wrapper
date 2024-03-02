import { BrasilAPIBank } from './sources/bank';
import { BrasilAPIBroker } from './sources/broker';
import { BrasilAPICEP } from './sources/cep';
import { BrasilAPICNPJ } from './sources/cnpj';

export class BrasilAPI {
	readonly bank = new BrasilAPIBank();
	readonly broker = new BrasilAPIBroker();
	readonly cep = new BrasilAPICEP();
	readonly cnpj = new BrasilAPICNPJ();
}
