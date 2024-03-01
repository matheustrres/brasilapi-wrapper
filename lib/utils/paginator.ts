export class Paginator<T> {
	#page = 1;
	#defLimit = 25;

	constructor(public items: T[] = []) {}

	page(val = this.#page): this {
		this.#page = val;

		return this;
	}

	skip(val = 0): this {
		const start = (this.#page - 1) * this.#defLimit + val;

		return this.#sliceItems(start);
	}

	take(val = this.#defLimit): this {
		this.#validateLimit(val);
		this.page(1);

		return this.#sliceItems(0, val);
	}

	limit(val = this.#defLimit): this {
		this.#validateLimit(val);

		const start = (this.#page - 1) * this.#defLimit;

		return this.#sliceItems(start, start + val);
	}

	#validateLimit(val: number): number {
		return Math.min(val, this.#defLimit);
	}

	#sliceItems(start: number, end = this.items.length) {
		this.items = this.items.slice(start, end);

		return this;
	}
}
