import assert from 'node:assert';
import { beforeEach, describe, it } from 'node:test';

import { BrasilAPI } from '@/lib/brasilapi';

describe('BrasilAPI', () => {
	let sut: BrasilAPI;

	beforeEach(() => {
		sut = new BrasilAPI();
	});

	it('should get a bank by its code', async () => {
		const { data: bank } = await sut.banks.get('157');

		assert.deepStrictEqual(bank, {
			ispb: bank!.ispb,
			name: bank!.name,
			code: bank!.code,
			fullName: bank!.fullName,
		});
	});

	it('should list all banks', async () => {
		const { data } = await sut.banks.list({
			take: 3,
		});

		const pages = data!.loadPages();
		const firstPage = pages[0]!;

		assert.deepStrictEqual(firstPage, [
			{
				ispb: firstPage[0]!.ispb,
				name: firstPage[0]!.name,
				code: firstPage[0]!.code,
				fullName: firstPage[0]!.fullName,
			},
			{
				ispb: firstPage[1]!.ispb,
				name: firstPage[1]!.name,
				code: firstPage[1]!.code,
				fullName: firstPage[1]!.fullName,
			},
			{
				ispb: firstPage[2]!.ispb,
				name: firstPage[2]!.name,
				code: firstPage[2]!.code,
				fullName: firstPage[2]!.fullName,
			},
		]);
	});

	it('should get a broker by its CNPJ', async () => {
		const { data: broker } = await sut.brokers.get('02332886000104');

		assert.deepStrictEqual(broker, {
			cnpj: broker!.cnpj,
			type: broker!.type,
			nome_social: broker!.nome_social,
			nome_comercial: broker!.nome_comercial,
			status: broker!.status,
			email: broker!.email,
			telefone: broker!.telefone,
			cep: broker!.cep,
			pais: broker!.pais,
			uf: broker!.uf,
			municipio: broker!.municipio,
			bairro: broker!.bairro,
			complemento: broker!.complemento,
			logradouro: broker!.logradouro,
			data_patrimonio_liquido: broker!.data_patrimonio_liquido,
			valor_patrimonio_liquido: broker!.valor_patrimonio_liquido,
			codigo_cvm: broker!.codigo_cvm,
			data_inicio_situacao: broker!.data_inicio_situacao,
			data_registro: broker!.data_registro,
		});
	});

	it('should list all brokers', async () => {
		const { data } = await sut.brokers.list({
			take: 2,
		});

		const pages = data!.loadPages();
		const firstPage = pages[0]!;

		assert.deepStrictEqual(firstPage, [
			{
				cnpj: firstPage[0]!.cnpj,
				type: firstPage[0]!.type,
				nome_social: firstPage[0]!.nome_social,
				nome_comercial: firstPage[0]!.nome_comercial,
				status: firstPage[0]!.status,
				email: firstPage[0]!.email,
				telefone: firstPage[0]!.telefone,
				cep: firstPage[0]!.cep,
				pais: firstPage[0]!.pais,
				uf: firstPage[0]!.uf,
				municipio: firstPage[0]!.municipio,
				bairro: firstPage[0]!.bairro,
				complemento: firstPage[0]!.complemento,
				logradouro: firstPage[0]!.logradouro,
				data_patrimonio_liquido: firstPage[0]!.data_patrimonio_liquido,
				valor_patrimonio_liquido: firstPage[0]!.valor_patrimonio_liquido,
				codigo_cvm: firstPage[0]!.codigo_cvm,
				data_inicio_situacao: firstPage[0]!.data_inicio_situacao,
				data_registro: firstPage[0]!.data_registro,
			},
			{
				cnpj: firstPage[1]!.cnpj,
				type: firstPage[1]!.type,
				nome_social: firstPage[1]!.nome_social,
				nome_comercial: firstPage[1]!.nome_comercial,
				status: firstPage[1]!.status,
				email: firstPage[1]!.email,
				telefone: firstPage[1]!.telefone,
				cep: firstPage[1]!.cep,
				pais: firstPage[1]!.pais,
				uf: firstPage[1]!.uf,
				municipio: firstPage[1]!.municipio,
				bairro: firstPage[1]!.bairro,
				complemento: firstPage[1]!.complemento,
				logradouro: firstPage[1]!.logradouro,
				data_patrimonio_liquido: firstPage[1]!.data_patrimonio_liquido,
				valor_patrimonio_liquido: firstPage[1]!.valor_patrimonio_liquido,
				codigo_cvm: firstPage[1]!.codigo_cvm,
				data_inicio_situacao: firstPage[1]!.data_inicio_situacao,
				data_registro: firstPage[1]!.data_registro,
			},
		]);
	});

	it.skip('should get a CEP from v1', async () => {
		const { data: cep } = await sut.CEPs.get('08226021', 'v1');

		assert.deepStrictEqual(cep, {
			cep: cep!.cep,
			state: cep!.state,
			city: cep!.city,
			neighborhood: cep!.neighborhood,
			street: cep!.street,
			service: cep!.service,
		});
	});

	it.skip('should get a CEP from v2', async () => {
		const { data: cep } = await sut.CEPs.get('22041011', 'v2');

		assert.deepStrictEqual(cep, {
			cep: cep!.cep,
			state: cep!.state,
			city: cep!.city,
			neighborhood: cep!.neighborhood,
			street: cep!.street,
			service: cep!.service,
			location: cep!.location,
		});
	});

	it('should get a CNPJ', async () => {
		const { data } = await sut.CNPJs.get('19131243000197');

		assert.deepStrictEqual(data, {
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
		const { data: weather } = await sut.CPTEC.listWeatherInCapitals({
			take: 3,
		});

		const weatherList = weather!.loadPage(1);

		assert.deepStrictEqual(weatherList, [
			{
				umidade: weatherList[0]!.umidade,
				intensidade: weatherList[0]!.intensidade,
				codigo_icao: weatherList[0]!.codigo_icao,
				pressao_atmosferica: weatherList[0]!.pressao_atmosferica,
				vento: weatherList[0]!.vento,
				direcao_vento: weatherList[0]!.direcao_vento,
				condicao: weatherList[0]!.condicao,
				condicao_desc: weatherList[0]!.condicao_desc,
				temp: weatherList[0]!.temp,
				atualizado_em: weatherList[0]!.atualizado_em,
			},
			{
				umidade: weatherList[1]!.umidade,
				intensidade: weatherList[1]!.intensidade,
				codigo_icao: weatherList[1]!.codigo_icao,
				pressao_atmosferica: weatherList[1]!.pressao_atmosferica,
				vento: weatherList[1]!.vento,
				direcao_vento: weatherList[1]!.direcao_vento,
				condicao: weatherList[1]!.condicao,
				condicao_desc: weatherList[1]!.condicao_desc,
				temp: weatherList[1]!.temp,
				atualizado_em: weatherList[1]!.atualizado_em,
			},
			{
				umidade: weatherList[2]!.umidade,
				intensidade: weatherList[2]!.intensidade,
				codigo_icao: weatherList[2]!.codigo_icao,
				pressao_atmosferica: weatherList[2]!.pressao_atmosferica,
				vento: weatherList[2]!.vento,
				direcao_vento: weatherList[2]!.direcao_vento,
				condicao: weatherList[2]!.condicao,
				condicao_desc: weatherList[2]!.condicao_desc,
				temp: weatherList[2]!.temp,
				atualizado_em: weatherList[2]!.atualizado_em,
			},
		]);
	});

	it('should get current weather conditions for an airport', async () => {
		const { data: weather } = await sut.CPTEC.getAirportWeather('SBAR');

		assert.deepStrictEqual(weather, {
			umidade: weather!.umidade,
			visibilidade: weather!.visibilidade,
			codigo_icao: weather!.codigo_icao,
			pressao_atmosferica: weather!.pressao_atmosferica,
			vento: weather!.vento,
			direcao_vento: weather!.direcao_vento,
			condicao: weather!.condicao,
			condicao_desc: weather!.condicao_desc,
			temp: weather!.temp,
			atualizado_em: weather!.atualizado_em,
		});
	});

	it('should get weather forecast for a city', async () => {
		const { data: forecast } = await sut.CPTEC.getCityWeatherForecast(999);

		assert.deepStrictEqual(forecast, {
			atualizado_em: forecast!.atualizado_em,
			cidade: forecast!.cidade,
			clima: forecast!.clima,
			estado: forecast!.estado,
		});
	});

	it('should get ocean forecast for a city', async () => {
		const { data: forecast } = await sut.CPTEC.getCityOceanForecast(241);

		assert.deepStrictEqual(forecast, {
			cidade: forecast!.cidade,
			estado: forecast!.estado,
			atualizado_em: forecast!.atualizado_em,
			ondas: forecast!.ondas,
		});
	});

	it('should get vehicle information according to FIPE table', async () => {
		const res = await sut.FIPE.getVehicle('001004-9', {
			take: 1,
		});

		const vehicle = res.data!.loadPage(1)[0];

		assert.deepStrictEqual(vehicle, {
			valor: vehicle!.valor,
			marca: vehicle!.marca,
			modelo: vehicle!.modelo,
			anoModelo: vehicle!.anoModelo,
			combustivel: vehicle!.combustivel,
			codigoFipe: vehicle!.codigoFipe,
			mesReferencia: vehicle!.mesReferencia,
			tipoVeiculo: vehicle!.tipoVeiculo,
			siglaCombustivel: vehicle!.siglaCombustivel,
			dataConsulta: vehicle!.dataConsulta,
		});
	});

	it('should list the existing reference tables', async () => {
		const res = await sut.FIPE.listReferenceTables({
			take: 3,
		});

		const referenceTableList = res.data!.loadPage();

		assert.deepStrictEqual(referenceTableList, [
			{
				codigo: referenceTableList[0]!.codigo,
				mes: referenceTableList[0]!.mes,
			},
			{
				codigo: referenceTableList[1]!.codigo,
				mes: referenceTableList[1]!.mes,
			},
			{
				codigo: referenceTableList[2]!.codigo,
				mes: referenceTableList[2]!.mes,
			},
		]);
	});

	it('should list vehicle brands by type', async () => {
		const res = await sut.FIPE.listVehicleBrandsByType(
			'carros',
			{
				take: 3,
			},
			271,
		);

		const vehicleBrandList = res.data!.loadPage(1);

		assert.deepStrictEqual(vehicleBrandList, [
			{ nome: vehicleBrandList[0]!.nome, valor: vehicleBrandList[0]!.valor },
			{ nome: vehicleBrandList[1]!.nome, valor: vehicleBrandList[1]!.valor },
			{ nome: vehicleBrandList[2]!.nome, valor: vehicleBrandList[2]!.valor },
		]);
	});

	it('should get brazilian state information', async () => {
		const { data: state } = await sut.IBGE.getState('RJ');

		assert.deepStrictEqual(state, {
			id: state!.id,
			sigla: state!.sigla,
			nome: state!.nome,
			regiao: state!.regiao,
		});
	});

	it('should list brazilian states information', async () => {
		const { data: states } = await sut.IBGE.listStates({
			take: 3,
		});

		const statesPage = states!.loadPage(1);

		assert.deepStrictEqual(statesPage, [
			{
				id: statesPage[0]!.id,
				sigla: statesPage[0]!.sigla,
				nome: statesPage[0]!.nome,
				regiao: statesPage[0]!.regiao,
			},
			{
				id: statesPage[1]!.id,
				sigla: statesPage[1]!.sigla,
				nome: statesPage[1]!.nome,
				regiao: statesPage[1]!.regiao,
			},
			{
				id: statesPage[2]!.id,
				sigla: statesPage[2]!.sigla,
				nome: statesPage[2]!.nome,
				regiao: statesPage[2]!.regiao,
			},
		]);
	});

	it('should list the municipalities of the federative unit', async () => {
		const { data: municipalities } =
			await sut.IBGE.listFederativeUnitMinicipalities('RJ', ['gov'], {
				take: 5,
			});

		const municipalitiesPage = municipalities!.loadPage(1);

		assert.deepStrictEqual(municipalitiesPage, [
			{
				nome: municipalitiesPage[0]!.nome,
				codigo_ibge: municipalitiesPage[0]!.codigo_ibge,
			},
			{
				nome: municipalitiesPage[1]!.nome,
				codigo_ibge: municipalitiesPage[1]!.codigo_ibge,
			},
			{
				nome: municipalitiesPage[2]!.nome,
				codigo_ibge: municipalitiesPage[2]!.codigo_ibge,
			},
			{
				nome: municipalitiesPage[3]!.nome,
				codigo_ibge: municipalitiesPage[3]!.codigo_ibge,
			},
			{
				nome: municipalitiesPage[4]!.nome,
				codigo_ibge: municipalitiesPage[4]!.codigo_ibge,
			},
		]);
	});

	it('should get a book through ISBN', async () => {
		const { data: book } = await sut.ISBN.getBook('9788545702870');

		assert.deepStrictEqual(book, {
			isbn: book!.isbn,
			title: book!.title,
			subtitle: book!.subtitle,
			authors: book!.authors,
			publisher: book!.publisher,
			synopsis: book!.synopsis,
			dimensions: book!.dimensions,
			year: book!.year,
			format: book!.format,
			page_count: book!.page_count,
			subjects: book!.subjects,
			location: book!.location,
			retail_price: book!.retail_price,
			cover_url: book!.cover_url,
			provider: book!.provider,
		});
	});

	it('should get a DDD', async () => {
		const { data: ddd } = await sut.DDDs.get('21');

		assert.deepStrictEqual(ddd, {
			state: ddd!.state,
			cities: ddd!.cities,
		});
	});
});
