export type Bank = {
	ispb: string;
	name: string;
	code: number | null;
	fullName: string;
};

export type Cep = {
	cep: string;
	state: string;
	city: string;
	neighborhood: string;
	street: string;
	service: string;
	location: Location;
};

export type Location = {
	type: string;
	coordinates: Coordinates;
};

export type Coordinates = {
	longitude: string;
	latitude: string;
};

export type ListParams = {
	take?: number;
	skip?: number;
	page?: number;
	limit?: number;
};
