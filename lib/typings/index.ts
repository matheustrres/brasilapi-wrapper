export type Bank = {
	ispb: string;
	name: string;
	code: number | null;
	fullName: string;
};

export type Broker = {
	bairro: string;
	cep: string;
	cnpj: string;
	codigo_cvm: string;
	complemento: string;
	data_inicio_situacao: string;
	data_patrimonio_liquido: string;
	data_registro: string;
	email: string;
	logradouro: string;
	municipio: string;
	nome_social: string;
	nome_comercial: string;
	pais: string;
	status: string;
	telefone: string;
	type: string;
	uf: string;
	valor_patrimonio_liquido: string;
};

export type CEP = {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	service: string;
	location?: Location;
};

export type Location = {
	type: string;
	coordinates: Coordinates;
};

export type Coordinates = {
	longitude: string;
	latitude: string;
};

export type CNPJ = {
	cnpj: string;
	identificador_matriz_filial: number;
	descricao_matriz_filial: string;
	razao_social: string;
	nome_fantasia: string;
	situacao_cadastral: number;
	pais?: string | null;
	email?: string | null;
	codigo_pais?: string | null;
	codigo_porte?: string | null;
	natureza_juridica?: string | null;
	descricao_situacao_cadastral: string;
	data_situacao_cadastral: string;
	motivo_situacao_cadastral: number;
	nome_cidade_exterior: string | null;
	codigo_natureza_juridica: number;
	data_inicio_atividade: string;
	cnae_fiscal: number;
	cnae_fiscal_descricao: string;
	descricao_tipo_de_logradouro: string;
	logradouro: string;
	numero: string;
	complemento: string;
	bairro: string;
	cep: number;
	uf: string;
	codigo_municipio: number;
	municipio: string;
	ddd_telefone_1: string;
	ddd_telefone_2: string | null;
	ddd_fax: string | null;
	qualificacao_do_responsavel: number;
	capital_social: number;
	porte: number;
	descricao_porte: string;
	opcao_pelo_simples: boolean | null;
	data_opcao_pelo_simples: unknown | null;
	data_exclusao_do_simples: unknown | null;
	data_opcao_pelo_mei?: string | null;
	data_exclusao_do_mei?: string | null;
	opcao_pelo_mei: boolean | null;
	situacao_especial: unknown | null;
	data_situacao_especial: unknown | null;
	cnaes_secundarios: CNAE[];
	qsa: QSA[];
};

export type QSA = {
	identificador_de_socio: number;
	nome_socio: string;
	cnpj_cpf_do_socio: string;
	codigo_qualificacao_socio: number;
	percentual_capital_social: number;
	data_entrada_sociedade: string;
	cpf_representante_legal: string | null;
	nome_representante_legal: string | null;
	codigo_qualificacao_representante_legal: unknown | null;
};

export type CNAE = {
	codigo: number;
	descricao: string;
};

export type City = {
	nome: string;
	estado: string;
	id: string;
};

export type Vehicle = {
	valor: string;
	marca: string;
	modelo: string;
	anoModelo: number;
	combustivel: string;
	codigoFipe: string;
	mesReferencia: string;
	tipoVeiculo: number;
	siglaCombustivel: string;
	dataConsulta: string;
};

export type VehicleType = 'caminhoes' | 'carros' | 'motos';

export type VehicleBrand = {
	nome: string;
	valor: string;
};

export type ReferenceTable = {
	codigo: number;
	mes: string;
};

export type Weather = {
	umidade: number;
	intensidade: string;
	codigo_icao: string;
	pressao_atmosferica: number;
	vento: number;
	direcao_vento: number;
	condicao: string;
	condicao_desc: string;
	temp: number;
	visibilidade: string | null;
	atualizado_em: string;
};

export type WeatherForecast = {
	cidade: string;
	estado: string;
	atualizado_em: string;
	clima: Climate[];
};

export type Climate = {
	data: string;
	condicao: string;
	min: number;
	max: number;
	indice_uv: number;
	condicao_desc: string;
};

export type OceanForecast = {
	cidade: string;
	estado: string;
	atualizado_em: string;
	ondas: Wave[];
};

export type Wave = {
	data: string;
	dados_ondas: WaveData[];
};

export type WaveData = {
	vento: number;
	direcao_vento: string;
	direcao_vento_desc: string;
	altura_onda: number;
	direcao_onda: string;
	direcao_onda_desc: string;
	agitacao: string;
	hora: string;
};

export type DDD = {
	state: string;
	cities: string[];
};

export type Municipality = {
	nome: string;
	codigo_ibge: string;
};

export type State = {
	id: number;
	sigla: string;
	nome: string;
	regiao: Region;
};

export type Region = {
	id: number;
	sigla: string;
	nome: string;
};

export type Book = {
	isbn: string;
	title: string;
	subtitle: string | null;
	authors: string[];
	publisher: string;
	synopsis: string;
	dimensions: Dimensions;
	year: number;
	format: string;
	page_count: number;
	subjects: string[];
	location: string;
	retail_price: number | null;
	cover_url: string | null;
	provider: string;
};

export type Dimensions = {
	width: number;
	height: number;
	unit: string;
};

export type Provider =
	| 'cbl'
	| 'mercado-editorial'
	| 'open-library'
	| 'google-books';

export type ListParams = {
	take?: number;
	skip?: number;
	itemsPerPage?: number;
	page?: number;
};
