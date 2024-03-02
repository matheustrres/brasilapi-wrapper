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
		const res = await sut.banks.fetch('157');

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
		const res = await sut.banks.list({
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

	it('should fetch a broker by its CNPJ', async () => {
		const res = await sut.brokers.fetch('02332886000104');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cnpj: '02332886000104',
			type: 'CORRETORAS',
			nome_social: 'XP INVESTIMENTOS CCTVM S.A.',
			nome_comercial: 'XP INVESTIMENTOS',
			status: 'EM FUNCIONAMENTO NORMAL',
			email: 'fabricio.almeida@xpi.com.br',
			telefone: '30272237',
			cep: '22440032',
			pais: '',
			uf: 'RJ',
			municipio: 'RIO DE JANEIRO',
			bairro: 'LEBLON',
			complemento: '5º ANDAR',
			logradouro: 'AVENIDA ATAULFO DE PAIVA 153',
			data_patrimonio_liquido: '2022-12-31',
			valor_patrimonio_liquido: '8288904369.58',
			codigo_cvm: '3247',
			data_inicio_situacao: '1998-02-10',
			data_registro: '1997-12-05',
		});
	});

	it('should list all brokers', async () => {
		const res = await sut.brokers.list({
			page: 2,
			limit: 3,
		});

		assert.ok(res);
		assert.equal(res.data!.length, 3);

		for (const item of res.data!) {
			assert.deepStrictEqual(
				objHasKeys(item, [
					'bairro',
					'cep',
					'cnpj',
					'codigo_cvm',
					'complemento',
					'data_inicio_situacao',
					'data_patrimonio_liquido',
					'data_registro',
					'email',
					'logradouro',
					'municipio',
					'nome_social',
					'nome_comercial',
					'pais',
					'status',
					'telefone',
					'type',
					'uf',
					'valor_patrimonio_liquido',
				]),
				true,
			);
		}
	});

	it('should fetch a CEP from v1', async () => {
		const res = await sut.CEPs.fetchV1('08226021');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cep: '08226021',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Cidade Antônio Estevão de Carvalho',
			street: 'Rua 18 de Abril',
			service: 'widenet',
		});
	});

	it('should fetch a CEP from v2', async () => {
		const res = await sut.CEPs.fetchV2('22041011');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cep: '22041011',
			state: 'RJ',
			city: 'Rio de Janeiro',
			neighborhood: 'Copacabana',
			street: 'Rua Santa Clara - de 1 ao fim - lado ímpar',
			service: 'correios-alt',
			location: { type: 'Point', coordinates: {} },
		});
	});

	it('should fetch a CNPJ', async () => {
		const res = await sut.CNPJs.fetch('19131243000197');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			uf: 'SP',
			cep: '01311902',
			qsa: [
				{
					pais: null,
					nome_socio: 'FERNANDA CAMPAGNUCCI PEREIRA',
					codigo_pais: null,
					faixa_etaria: 'Entre 31 a 40 anos',
					cnpj_cpf_do_socio: '***690948**',
					qualificacao_socio: 'Presidente',
					codigo_faixa_etaria: 4,
					data_entrada_sociedade: '2019-10-25',
					identificador_de_socio: 2,
					cpf_representante_legal: '***000000**',
					nome_representante_legal: '',
					codigo_qualificacao_socio: 16,
					qualificacao_representante_legal: 'Não informada',
					codigo_qualificacao_representante_legal: 0,
				},
			],
			cnpj: '19131243000197',
			pais: null,
			email: null,
			porte: 'DEMAIS',
			bairro: 'BELA VISTA',
			numero: '37',
			ddd_fax: '',
			municipio: 'SAO PAULO',
			logradouro: 'PAULISTA 37',
			cnae_fiscal: 9430800,
			codigo_pais: null,
			complemento: 'ANDAR 4',
			codigo_porte: 5,
			razao_social: 'OPEN KNOWLEDGE BRASIL',
			nome_fantasia: 'REDE PELO CONHECIMENTO LIVRE',
			capital_social: 0,
			ddd_telefone_1: '1123851939',
			ddd_telefone_2: '',
			opcao_pelo_mei: null,
			descricao_porte: '',
			codigo_municipio: 7107,
			cnaes_secundarios: [
				{
					codigo: 9493600,
					descricao:
						'Atividades de organizações associativas ligadas à cultura e à arte',
				},
				{
					codigo: 9499500,
					descricao: 'Atividades associativas não especificadas anteriormente',
				},
				{
					codigo: 8599699,
					descricao:
						'Outras atividades de ensino não especificadas anteriormente',
				},
				{
					codigo: 8230001,
					descricao:
						'Serviços de organização de feiras, congressos, exposições e festas',
				},
				{
					codigo: 6204000,
					descricao: 'Consultoria em tecnologia da informação',
				},
			],
			natureza_juridica: 'Associação Privada',
			situacao_especial: '',
			opcao_pelo_simples: null,
			situacao_cadastral: 2,
			data_opcao_pelo_mei: null,
			data_exclusao_do_mei: null,
			cnae_fiscal_descricao:
				'Atividades de associações de defesa de direitos sociais',
			codigo_municipio_ibge: 3550308,
			data_inicio_atividade: '2013-10-03',
			data_situacao_especial: null,
			data_opcao_pelo_simples: null,
			data_situacao_cadastral: '2013-10-03',
			nome_cidade_no_exterior: '',
			codigo_natureza_juridica: 3999,
			data_exclusao_do_simples: null,
			motivo_situacao_cadastral: 0,
			ente_federativo_responsavel: '',
			identificador_matriz_filial: 1,
			qualificacao_do_responsavel: 16,
			descricao_situacao_cadastral: 'ATIVA',
			descricao_tipo_de_logradouro: 'AVENIDA',
			descricao_motivo_situacao_cadastral: 'SEM MOTIVO',
			descricao_identificador_matriz_filial: 'MATRIZ',
		});
	});

	it('should fetch a DDD', async () => {
		const res = await sut.DDDs.fetch('21');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			state: 'RJ',
			cities: [
				'TERESÓPOLIS',
				'TANGUÁ',
				'SEROPÉDICA',
				'SÃO JOÃO DE MERITI',
				'SÃO GONÇALO',
				'RIO DE JANEIRO',
				'RIO BONITO',
				'QUEIMADOS',
				'PARACAMBI',
				'NOVA IGUAÇU',
				'NITERÓI',
				'NILÓPOLIS',
				'MESQUITA',
				'MARICÁ',
				'MANGARATIBA',
				'MAGÉ',
				'JAPERI',
				'ITAGUAÍ',
				'ITABORAÍ',
				'GUAPIMIRIM',
				'DUQUE DE CAXIAS',
				'CACHOEIRAS DE MACACU',
				'BELFORD ROXO',
			],
		});
	});
});
