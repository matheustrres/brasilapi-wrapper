/**
 * @author matheustrres
 * @see {@link [gist](https://gist.github.com/matheustrres/5d6b1647a547e009b33c1cb7117a7e27)}
 */

type PaginatorConfig<T> = {
	items: T[];
	itemsPerPage?: number;
	take?: number;
	skip?: number;
};

/**
 * A facilitator for data pagination
 *
 * @prop {Number} itemsPerPage - The limit of items per page
 */
export class Paginator<T> {
	itemsPerPage: number;

	#items: T[];

	#pages = new Map<number, T[]>();

	/**
	 * Create a new Paginator instance
	 *
	 * @param {PaginatorConfig<T>} config -The configuration options for Paginator
	 * @param {T[]} config.items - The items to be paginated
	 * @param {Number} config.itemsPerPage - The limit of items per page
	 * @param {Number} [config.take] - The number of items to be taken
	 * @param {Number} [config.skip] - The number of items to be skipped
	 */
	constructor(cfg: PaginatorConfig<T>) {
		this.#items = cfg.items;

		this.#skipItems(cfg.skip);
		this.#takeItems(cfg.take);

		this.itemsPerPage = cfg.itemsPerPage ? Math.floor(cfg.itemsPerPage) : 20;
	}

	/**
	 * Load all pages and it's items
	 *
	 * @returns {T[][]}
	 */
	loadPages(): T[][] {
		const pages: T[][] = [];
		const totalPages = Math.ceil(this.#items.length / this.itemsPerPage);

		for (let i = 0; i < totalPages; i++) {
			pages.push(this.loadPage(i));
		}

		return pages;
	}

	/**
	 * Load a single page and it's items
	 *
	 * @param {Number} p - The page to be loaded
	 * @returns {T[]}
	 */
	loadPage(p = 1): T[] {
		if (!Number.isInteger(p) || p <= 0) p = 1;

		if (!this.#pages.has(p)) {
			const start = (p - 1) * this.itemsPerPage;
			const end = Math.min(start + this.itemsPerPage, this.#items.length);

			const pageItems = this.#items.slice(start, end);

			this.#pages.set(p, pageItems);
		}

		return this.#pages.get(p) || [];
	}

	/**
	 * Take an amount of items from the original items array
	 *
	 * @param {Number} [amount] - The amount of items to be taken (defaults to `itemsPerPage`)
	 * @returns {void}
	 */
	#takeItems(amount = this.itemsPerPage): void {
		this.#items = this.#sliceArr(this.#items, 0, amount);
	}

	/**
	 * Make a copy of a section from the original items array
	 *
	 * @param {T[]} items - The original items array
	 * @param {Number} start - The start index
	 * @param {Number} [end] - The end index
	 * @returns {T[]}
	 */
	#sliceArr(items: T[], start: number, end?: number): T[] {
		return items.slice(start, end);
	}

	/**
	 * Skip an amount of items from the original items array
	 *
	 * @param {Number} [amount] - The amount of items to be skipped (defaults to `0`)
	 * @returns {void}
	 */
	#skipItems(amount = 0): void {
		this.#items = this.#sliceArr(this.#items, amount);
	}
}
