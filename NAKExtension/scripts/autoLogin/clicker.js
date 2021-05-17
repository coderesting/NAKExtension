async function attemptLogin(usernameInput, passwordInput, loginButton) {
	const { username, password, lastTry } = await getUserDataChrome();

	if (username && password) {
		usernameInput.value = username;
		passwordInput.value = password;
	}

	if (Date.now() - lastTry > 10000) {
		console.log("auto login");
		await setUserDataChrome({ lastTry: Date.now() });
		loginButton.click();
	} else {
		console.warn("no auto login: recent failed attempt");
	}
}

function getUserDataChrome() {
	return new Promise((res) => {
		chrome.storage.local.get(
			{
				username: "",
				password: "",
				lastTry: 0,
			},
			(data) => res(data)
		);
	});
}

async function setUserDataChrome(userData) {
	return new Promise((res) => {
		chrome.storage.local.set(userData, res);
	});
}
