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
	return new Promise((res) => {
		chrome.storage.local.set(data, res);
	});
}
