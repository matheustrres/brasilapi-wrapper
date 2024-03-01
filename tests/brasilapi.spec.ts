import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { BrasilAPI } from '@/lib/brasilapi';

const objHasKeys = <T extends object>(
	obj: T,
	expectedKeys: string[],
): boolean => {
	const objKeys = Object.keys(obj);

	return expectedKeys.every((k) => objKeys.includes(k));
};

describe('BrasilAPI', () => {
	let sut: BrasilAPI;

	beforeEach(() => {
		sut = new BrasilAPI();
	});

	it('should fetch a bank by its code', async () => {
		const res = await sut.bank.fetch('157');

		assert.ok(res);
		assert.deepEqual(res, {
			timestamp: res.timestamp,
			data: {
				ispb: '09105360',
				name: 'ICAP DO BRASIL CTVM LTDA.',
				code: 157,
				fullName:
					'ICAP do Brasil Corretora de Títulos e Valores Mobiliários Ltda.',
			},
		});
	});

	it('should list all banks', async () => {
		const res = await sut.bank.list({
			limit: 10,
			take: 5,
		});

		assert.ok(res);
		assert.equal(res.data!.length, 5);

		for (const item of res.data!) {
			assert.deepStrictEqual(
				objHasKeys(item, ['ispb', 'name', 'code', 'fullName']),
				true,
			);
		}
	});

	it('should fetch a CEP', async () => {
		const res = await sut.cep.fetch('08226021');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cep: '08226021',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Cidade Antônio Estevão de Carvalho',
			street: 'Rua 18 de Abril',
			service: 'correios-alt',
			location: { type: 'Point', coordinates: {} },
		});
	});
});
