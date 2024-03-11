import { Source } from './source';

import { makeGET } from '../clients/http-client';
import { type Book, type Provider } from '../typings';
import { type BrasilAPIResponse, type Result } from '../typings/result';

interface IISBN {
	getBook(isbn: string, providers?: Provider[]): Promise<Result<Book>>;
}

/**
 * Represents the source from BrasilAPI ISBN's endpoint responses
 */
export class BrasilAPIISBN extends Source implements IISBN {
	protected readonly URL = 'https://brasilapi.com.br/api/isbn/v1';

	/**
	 * Get information about a book from the ISBN
	 *
	 * @param {String} isbn - The book ISBN identifier
	 * @param {Array<Provider>} [providers] - List of providers to find information about the book
	 * @returns {Promise<Result<Book>>}
	 */
	async getBook(isbn: string, providers?: Provider[]) {
		const res = await makeGET<BrasilAPIResponse<Book>>(
			`${this.URL}/${isbn}?providers=${providers?.join(',')}`,
		);

		return this.followUp(res);
	}
}
