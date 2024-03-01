export type Bank = {
	ispb: string;
	name: string;
	code: number | null;
	fullName: string;
};

export type ListParams = {
	take?: number;
	skip?: number;
	page?: number;
	limit?: number;
};
