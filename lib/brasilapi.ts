import { BrasilAPIBank } from './sources/bank';
import { BrasilAPIBroker } from './sources/broker';
import { BrasilAPICEP } from './sources/cep';
import { BrasilAPICNPJ } from './sources/cnpj';
import { BrasilAPICPTEC } from './sources/cptec';
import { BrasilAPIDDD } from './sources/ddd';
import { BrasilAPIFIPE } from './sources/fipe';
import { BrasilAPIIBGE } from './sources/ibge';

/**
 * Represents the main BrasilAPI client wrapper
 *
 */
export class BrasilAPI {
	get banks() {
		return new BrasilAPIBank();
	}

	get brokers() {
		return new BrasilAPIBroker();
	}

	get CEPs() {
		return new BrasilAPICEP();
	}

	get CNPJs() {
		return new BrasilAPICNPJ();
	}

	get CPTEC() {
		return new BrasilAPICPTEC();
	}

	get DDDs() {
		return new BrasilAPIDDD();
	}

	get FIPE() {
		return new BrasilAPIFIPE();
	}

	get IBGE() {
		return new BrasilAPIIBGE();
	}
}
