export class HttpsClient {
	static async GET<T>(url: string): Promise<T> {
		const response = await fetch(new URL(url), {
			method: 'GET',
		});

		const json = (await response.json()) as T;

		return json;
	}
}
