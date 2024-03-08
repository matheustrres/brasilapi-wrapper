# BrasilAPI Wrapper

A lightweight, easy-to-use & free of dependencies wrapper for **[BrasilAPI](https://brasilapi.com.br/)**

## Stay in touch

- Author: **[Matheus Torres](https://www.github.com/matheustrres)**

## Installation

Install the package with your package manager:

```bash
npm install @matheustrres/brasilapi
yarn add @matheustrres/brasilapi
pnpm add @matheustrres/brasilapi
```

## Usage

-  Initialize the client

```typescript
import { BrasilAPI } from '@matheustrres/brasilapi';

const brasilAPI = new BrasilAPI();
```

- Get information from a brazilian bank
```typescript
const { data: bank } = await brasilAPI.banks.get('157');

console.log(bank);
```

- List all banks from Brazil
```typescript
const { data: banks } = await brasilAPI.banks.list({
  itemsPerPage: 10,
  take: 20,
});

console.log(banks!.loadPages());
```

- Get information from a broker in the CVM archives
```typescript
const { data: broker } = await brasilAPI.brokers.get('02332886000104');

console.log(broker);
```

- List all brokers in the CVM archives
```typescript
const { data: brokers } = await brasilAPI.brokers.list({
  itemsPerPage: 5,
  take: 15
});

console.log(brokers!.loadPages());
```

- Get information from a brazilian Zip Code using v1 endpoint
```typescript
const { data: cep } = await brasilAPI.CEPs.get('08226021', 'v1');

console.log(cep);
```

- Get information from a brazilian Zip Code using v2 endpoint
```typescript
const { data: cep } = await brasilAPI.CEPs.get('08226021', 'v2');

console.log(cep);
```

- Get information from a brazilian CNPJ through Minha Receita API
```typescript
const { data: cnpj } = await brasilAPI.CNPJs.get('19131243000197');

console.log(cnpj);
```

- List all the cities with their respective codes in the CPTEC services
```typescript
const { data: cities } = await brasilAPI.CPTEC.listCities({
  itemsPerPage: 6,
  take: 20,
});

console.log(cities!.loadPages());
```

- List the current weather conditions for brazilian capitals
```typescript
const { data: weather } = await brasilAPI.CPTEC.listWeatherInCapitals({
  itemsPerPage: 10,
  take: 50,
});

console.log(weather!.loadPages());
```

- List all the cities corresponding to the search term along their respective codes in the CPTEC services
```typescript
const { data: relatedCities } = await brasilAPI.CPTEC.getCity('São Benedito', {
  take: 5,
})

console.log(relatedCities!.loadPage(1));
```

- Get current weather condition at an airport
```typescript
const { data: weather } = await brasilAPI.CPTEC.getAirportWeather('SBAR');

console.log(weather);
```

- Get weather forecast for 1 day in the city entered
```typescript
const { data: forecast } = await brasilAPI.CPTEC.getCityWeatherForecast(999);

console.log(forecast);
```

- Get ocean forecast for 1 day in the city entered
```typescript
const { data: forecast } = await brasilAPI.CPTEC.getCityOceanForecast(241);

console.log(forecast);
```

- Get state and list of cities by Area Code
```typescript
const { data: ddd } = await brasilAPI.DDDs.get('21')

console.log(ddd);
```

- Get information from a brazilian state through its acronym or code
```typescript
const { data: state } = await brasilAPI.IBGE.getState('RJ');

console.log(state);
```

- List municipalities of the brazilian federative unit
```typescript
const { data: municipalities } = await brasilAPI.IBGE.listFederativeUnitMinicipalities('RJ', ['gov', 'wikipedia'], {
  take: 10,
});

console.log(municipalities.loadPages());
```

- List all brazilian states information
```typescript
const { data: states } = await brasilAPI.IBGE.listStates({
  take: 5,
});

console.log(states.loadPages());
```

## License

This project is **[MIT](https://github.com/matheustrres/brasilapi-wrapper/blob/main/LICENSE)** licensed.
