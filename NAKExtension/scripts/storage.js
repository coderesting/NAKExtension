function getData(data) {
	return getDataChrome(data);
}

function setData(data) {
	return setDataChrome(data);
}

function getDataChrome(data) {
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
