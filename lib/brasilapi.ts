import { BrasilAPIBank } from './sources/bank';
import { BrasilAPIBroker } from './sources/broker';
import { BrasilAPICEP } from './sources/cep';
import { BrasilAPICNPJ } from './sources/cnpj';
import { BrasilAPICPTEC } from './sources/cptec';
import { BrasilAPIDDD } from './sources/ddd';

export class BrasilAPI {
	readonly banks = new BrasilAPIBank();
	readonly brokers = new BrasilAPIBroker();
	readonly CEPs = new BrasilAPICEP();
	readonly CNPJs = new BrasilAPICNPJ();
	readonly CPTEC = new BrasilAPICPTEC();
	readonly DDDs = new BrasilAPIDDD();
}
