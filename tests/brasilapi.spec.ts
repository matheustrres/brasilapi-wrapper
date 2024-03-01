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

	it('should fetch a CNPJ', async () => {
		const res = await sut.cnpj.fetch('19131243000197');

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
});
