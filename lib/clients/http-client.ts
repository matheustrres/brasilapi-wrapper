export async function makeGET<T>(url: string): Promise<T> {
	const start = process.hrtime();
	// some operation here...
	const response = await fetch(new URL(url), {
		method: 'GET',
	});
	const stop = process.hrtime(start);
	const time = (stop[0] * 1e9 + stop[1]) / 1e6;

	const execTime = time > 1 ? `${time}ms` : `${(time * 1e3).toFixed(3)}μs`;

	console.log('Request made took: ', execTime);

	const json = (await response.json()) as T;

	return json;
}
