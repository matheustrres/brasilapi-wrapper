import { BrasilAPIBank } from './sources/bank';
import { BrasilAPIBroker } from './sources/broker';
import { BrasilAPICEP } from './sources/cep';
import { BrasilAPICNPJ } from './sources/cnpj';

export class BrasilAPI {
	readonly banks = new BrasilAPIBank();
	readonly brokers = new BrasilAPIBroker();
	readonly CEPs = new BrasilAPICEP();
	readonly CNPJs = new BrasilAPICNPJ();
}
