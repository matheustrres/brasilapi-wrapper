import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { BrasilAPI } from '@/lib/brasilapi';

describe('BrasilAPI', () => {
	let sut: BrasilAPI;

	beforeEach(() => {
		sut = new BrasilAPI();
	});

	it('should get a bank by its code', async () => {
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
});
