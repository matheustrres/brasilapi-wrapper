import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { BrasilAPI } from '@/lib/brasilapi';

describe('BrasilAPI', () => {
	let sut: BrasilAPI;

	beforeEach(() => {
		sut = new BrasilAPI();
	});

	it('should get a bank by its code', async () => {
		const res = await sut.banks.get('157');

		assert.ok(res);
		assert.deepStrictEqual(res, {
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
			itemsPerPage: 10,
			take: 5,
		});

		assert.ok(res);
		assert.equal(res.data!.itemsPerPage, 10);
		assert.equal(res.data!.loadPages().length, 1);
		assert.deepStrictEqual(res.data!.loadPage(1), [
			{
				ispb: '00000000',
				name: 'BCO DO BRASIL S.A.',
				code: 1,
				fullName: 'Banco do Brasil S.A.',
			},
			{
				ispb: '00000208',
				name: 'BRB - BCO DE BRASILIA S.A.',
				code: 70,
				fullName: 'BRB - BANCO DE BRASILIA S.A.',
			},
			{
				ispb: '00038121',
				name: 'Selic',
				code: null,
				fullName: 'Banco Central do Brasil - Selic',
			},
			{
				ispb: '00038166',
				name: 'Bacen',
				code: null,
				fullName: 'Banco Central do Brasil',
			},
			{
				ispb: '00122327',
				name: 'SANTINVEST S.A. - CFI',
				code: 539,
				fullName: 'SANTINVEST S.A. - CREDITO, FINANCIAMENTO E INVESTIMENTOS',
			},
		]);
	});

	it('should get a broker by its CNPJ', async () => {
		const res = await sut.brokers.get('02332886000104');

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
			take: 3,
			itemsPerPage: 5,
		});

		assert.ok(res);
		assert.equal(res.data!.itemsPerPage, 5);
		assert.equal(res.data!.loadPages().length, 1);
		assert.equal(res.data!.loadPage(1).length, 3);
		assert.deepStrictEqual(res.data!.loadPage(1), [
			{
				cnpj: '76621457000185',
				type: 'CORRETORAS',
				nome_social: '4UM DTVM S.A.',
				nome_comercial: '4UM INVESTIMENTOS',
				status: 'CANCELADA',
				email: 'controle@4um.com.br',
				telefone: '33519966',
				cep: '80420210',
				pais: 'BRASIL',
				uf: 'PR',
				municipio: 'CURITIBA',
				bairro: 'CENTRO',
				complemento: '4º ANDAR',
				logradouro: 'R. VISCONDE DO RIO BRANCO 1488',
				data_patrimonio_liquido: '2005-12-31',
				valor_patrimonio_liquido: '4228660.18',
				codigo_cvm: '2275',
				data_inicio_situacao: '2006-10-05',
				data_registro: '1968-01-15',
			},
			{
				cnpj: '33817677000176',
				type: 'CORRETORAS',
				nome_social:
					'ABC BRASIL DISTRIBUIDORA DE TÍTULOS E VALORES MOBILIÁRIOS S.A.',
				nome_comercial: 'ABC BRASIL CORRETORA',
				status: 'CANCELADA',
				email: 'complianceregulatorio@abcbrasil.com.br',
				telefone: '31702172',
				cep: '1453000',
				pais: 'EGITO',
				uf: 'SP',
				municipio: 'SÃO PAULO',
				bairro: 'ITAIM BIBI',
				complemento: '2º ANDAR',
				logradouro: 'AV. CIDADE JARDIM, 803',
				data_patrimonio_liquido: '2002-12-31',
				valor_patrimonio_liquido: '0.00',
				codigo_cvm: '3514',
				data_inicio_situacao: '2002-10-14',
				data_registro: '2002-10-14',
			},
			{
				cnpj: '10664027000132',
				type: 'CORRETORAS',
				nome_social: 'ABERTURA CCVM LTDA',
				nome_comercial: 'ABERTURA CCVM LTDA',
				status: 'CANCELADA',
				email: '',
				telefone: '',
				cep: '50010240',
				pais: 'BRASIL',
				uf: 'PE',
				municipio: 'RECIFE',
				bairro: '',
				complemento: '',
				logradouro: 'R DO IMP.D.PEDRO II 239/CJ.102',
				data_patrimonio_liquido: '1989-12-31',
				valor_patrimonio_liquido: '5995252.29',
				codigo_cvm: '329',
				data_inicio_situacao: '1990-06-12',
				data_registro: '1986-07-08',
			},
		]);
	});

	it('should get a CEP from v1', async () => {
		const res = await sut.CEPs.getV1('08226021');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cep: '08226021',
			state: 'SP',
			city: 'São Paulo',
			neighborhood: 'Cidade Antônio Estevão de Carvalho',
			street: 'Rua 18 de Abril',
			service: res.data!.service,
		});
	});

	it('should get a CEP from v2', async () => {
		const res = await sut.CEPs.getV2('22041011');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cep: '22041011',
			state: 'RJ',
			city: 'Rio de Janeiro',
			neighborhood: 'Copacabana',
			street: 'Rua Santa Clara - de 1 ao fim - lado ímpar',
			service: res.data!.service,
			location: { type: 'Point', coordinates: {} },
		});
	});

	it('should get a CNPJ', async () => {
		const res = await sut.CNPJs.get('19131243000197');

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

	it('should list all cities', async () => {
		const res = await sut.CPTEC.listCities({
			itemsPerPage: 4,
			take: 3,
		});

		assert.ok(res);
		assert.equal(res.data!.itemsPerPage, 4);
		assert.equal(res.data!.loadPage(1).length, 3);
		assert.deepStrictEqual(res.data?.loadPage(1), [
			{ nome: 'São Benedito', id: 4750, estado: 'CE' },
			{ nome: 'São Benedito do Rio Preto', id: 4751, estado: 'MA' },
			{ nome: 'São Benedito do Sul', id: 4752, estado: 'PE' },
		]);
	});

	it('should get related cities', async () => {
		const res = await sut.CPTEC.getCity('São Benedito', {
			itemsPerPage: 3,
		});

		const page = res.data!.loadPage(1);

		assert.ok(res);
		assert.deepStrictEqual(page, [
			{ nome: 'São Benedito', id: 4750, estado: 'CE' },
			{ nome: 'São Benedito do Rio Preto', id: 4751, estado: 'MA' },
			{ nome: 'São Benedito do Sul', id: 4752, estado: 'PE' },
		]);
	});

	it('should list weather in the capitals', async () => {
		const res = await sut.CPTEC.listWeatherInCapitals({
			take: 3,
			itemsPerPage: 10,
		});

		const pages = res.data!.loadPages();

		assert.ok(res);
		assert.equal(pages.length, 1);
		assert.deepStrictEqual(pages[0], [
			{
				umidade: 84,
				intensidade: '>10000',
				codigo_icao: 'SBAR',
				pressao_atmosferica: 1013,
				vento: 22,
				direcao_vento: 90,
				condicao: 'ps',
				condicao_desc: 'Predomínio de Sol',
				temp: 29,
				atualizado_em: '2024-03-05T20:00:00.388Z',
			},
			{
				umidade: 89,
				intensidade: '>10000',
				codigo_icao: 'SBBE',
				pressao_atmosferica: 1011,
				vento: 14,
				direcao_vento: 50,
				condicao: 'ps',
				condicao_desc: 'Predomínio de Sol',
				temp: 27,
				atualizado_em: '2024-03-05T20:00:00.388Z',
			},
			{
				umidade: 88,
				intensidade: '>10000',
				codigo_icao: 'SBCF',
				pressao_atmosferica: 1018,
				vento: 4,
				direcao_vento: 270,
				condicao: 'ps',
				condicao_desc: 'Predomínio de Sol',
				temp: 22,
				atualizado_em: '2024-03-05T20:00:00.388Z',
			},
		]);
	});

	it('should get current weather conditions for an airport', async () => {
		const res = await sut.CPTEC.getAirportWeather('SBAR');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			umidade: 75,
			visibilidade: '>10000',
			codigo_icao: 'SBAR',
			pressao_atmosferica: 1014,
			vento: 14,
			direcao_vento: 80,
			condicao: 'ps',
			condicao_desc: 'Predomínio de Sol',
			temp: 30,
			atualizado_em: '2024-03-06T08:00:00.557Z',
		});
	});

	it('should get weather forecast for a city', async () => {
		const res = await sut.CPTEC.getCityWeatherForecast(999);

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			atualizado_em: res.data!.atualizado_em,
			cidade: 'Brejo Alegre',
			clima: [
				{
					condicao: res.data!.clima[0]!.condicao,
					condicao_desc: res.data!.clima[0]!.condicao_desc,
					data: res.data!.clima[0]!.data,
					indice_uv: res.data!.clima[0]!.indice_uv,
					max: res.data!.clima[0]!.max,
					min: res.data!.clima[0]!.min,
				},
			],
			estado: 'SP',
		});
	});

	it('should get ocean forecast for a city', async () => {
		const res = await sut.CPTEC.getCityOceanForecast(241);

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			cidade: 'Rio de Janeiro',
			estado: 'RJ',
			atualizado_em: res.data!.atualizado_em,
			ondas: res.data!.ondas,
		});
	});

	it('should get brazilian state information', async () => {
		const res = await sut.IBGE.getState('RJ');

		assert.ok(res);
		assert.deepStrictEqual(res.data, {
			id: 33,
			sigla: 'RJ',
			nome: 'Rio de Janeiro',
			regiao: { id: 3, sigla: 'SE', nome: 'Sudeste' },
		});
	});

	it('should list brazilian states information', async () => {
		const res = await sut.IBGE.listStates({
			take: 5,
		});

		const page = res.data?.loadPage(1);

		assert.ok(res);
		assert.deepStrictEqual(page, [
			{
				id: 11,
				sigla: 'RO',
				nome: 'Rondônia',
				regiao: { id: 1, sigla: 'N', nome: 'Norte' },
			},
			{
				id: 12,
				sigla: 'AC',
				nome: 'Acre',
				regiao: { id: 1, sigla: 'N', nome: 'Norte' },
			},
			{
				id: 13,
				sigla: 'AM',
				nome: 'Amazonas',
				regiao: { id: 1, sigla: 'N', nome: 'Norte' },
			},
			{
				id: 14,
				sigla: 'RR',
				nome: 'Roraima',
				regiao: { id: 1, sigla: 'N', nome: 'Norte' },
			},
			{
				id: 15,
				sigla: 'PA',
				nome: 'Pará',
				regiao: { id: 1, sigla: 'N', nome: 'Norte' },
			},
		]);
	});

	it('should list the municipalities of the federative unit', async () => {
		const res = await sut.IBGE.listFederativeUnitMinicipalities('RJ', ['gov'], {
			take: 5,
		});

		const page = res.data!.loadPage(1);

		assert.ok(res);
		assert.deepStrictEqual(page, [
			{ nome: 'ANGRA DOS REIS', codigo_ibge: '3300100' },
			{ nome: 'APERIBÉ', codigo_ibge: '3300159' },
			{ nome: 'ARARUAMA', codigo_ibge: '3300209' },
			{ nome: 'AREAL', codigo_ibge: '3300225' },
			{ nome: 'ARMAÇÃO DOS BÚZIOS', codigo_ibge: '3300233' },
		]);
	});

	it('should get a DDD', async () => {
		const res = await sut.DDDs.get('21');

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
