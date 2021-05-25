async function getData(data) {
	return await getDataChrome(data);
}

async function setData(data) {
	return await setDataChrome(data);
}

async function getDataChrome(data) {
	return new Promise((res) => {
		chrome.storage.local.get(data, (data) => res(data));
	});
}

async function setDataChrome(data) {
	const emptyKeys = Object.entries(data)
		.filter((d) => d[1] === "")
		.map((d) => d[0]);
	return new Promise((res) => {
		chrome.storage.local.set(data, () => {
			emptyKeys.forEach((emptyKey) => chrome.storage.local.remove(emptyKey));
			res();
		});
	});
}
