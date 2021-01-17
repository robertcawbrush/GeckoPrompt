import data from './data';

const baseUrl = 'localhost:8000';

export function fetchGridData() {
	let defer = new Promise(function (resolve, reject) {
		const jsonData = data;
		if (jsonData.hasOwnProperty('title')) {
			resolve(jsonData);
		}

		reject();
	});

	return defer;
}

// returns a mock data 
export function fetchRealEvents() {
	const url = (baseUrl + '/inspections?format=application/json');
	return getHttpRequest(url);
}

// returns a mock data set in absence of the api
export function fetchMockEvents() {
	
	const testEvents = [
			{
				title: "Multi Day Event",
				start: "2021-01-02 12:00:00 GMT-0600",
				end: "2021-01-04"
			},
			{
				title: "Single Event",
				start: "2021-01-14",
				end: "2021-01-14"
			},
			{
				title: "Scripting Convention",
				start: "2021-01-18",
				end: "2021-01-18"
			}, {
				title: "Christmas in january",
				start: "2021-01-25 12:00:00 GMT-0600",
				end: "2021-01-25 16:00:00 GMT-0600"
			},
		];
	
	let defer = new Promise(function (resolve, reject) {
		if (testEvents.length > 0) {
			resolve(testEvents);
		}

		reject();
	});

	return defer;
}

function getHttpRequest(url) {
	return fetch(url)
			.then(handleResponse)
			.catch(handleError);
}

async function handleResponse(response) {
  if (response.ok) return response.json();
  if (response.status === 400) {
    const error = await response.text();
    throw new Error(error);
  }
  throw new Error("Network response was bad: 400");
}

function handleError(error) {
  // eslint-disable-next-line no-console
  console.error("API call failed : " + error);
  throw error;
}
