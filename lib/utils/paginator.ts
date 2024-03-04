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
	#pages!: T[][];

	/**
	 * Create a new Paginator instance
	 *
	 * @param {PaginatorConfig<T>} config -The configuration options for Paginator
	 * @param {T[]} config.items - The items to be paginated
	 * @param {Number} config.itemsPerPage - The limit of items per page
	 * @param {Number} [config.take] - The number of items to be taken
	 * @param {Number} [config.skip] - The number of items to be skipped
	 */
	constructor({ items, itemsPerPage, skip, take }: PaginatorConfig<T>) {
		this.#items = items;

		this.#skipItems(skip);
		this.#takeItems(take);

		this.itemsPerPage = itemsPerPage ? Math.floor(itemsPerPage) : 20;
	}

	/**
	 * Load all pages and it's items
	 *
	 * @returns {T[][]}
	 */
	loadPages(): T[][] {
		if (!this.#pages || !this.#pages.length) {
			this.#pages = this.#chunkArr(this.#items, this.itemsPerPage);
		}

		return this.#pages;
	}

	/**
	 * Load a single page and it's items
	 *
	 * @param {Number} p - The page to be loaded
	 * @returns {T[]}
	 */
	loadPage(p = 1): T[] {
		const pages = this.loadPages();
		const page = pages[p - 1];

		return page || [];
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

	/**
	 * Divides the list of items into pages according to the specified size.
	 * Each page will contain a maximum number of items equal to the specified size.
	 * If the division is not uniform, the last page may contain fewer items.
	 *
	 * @param {T[]} items - The items to be chunked
	 * @param {Number} chunkSize - The amount of items per page
	 * @returns {void}
	 */
	#chunkArr(items: T[], chunkSize: number): T[][] {
		const pages: T[][] = [];

		for (let i = 0; i < items.length; i += chunkSize) {
			const chunk = items.slice(i, i + chunkSize);

			pages.push(chunk);
		}

		return pages;
	}
}
