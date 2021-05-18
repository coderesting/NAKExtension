async function attemptLogin(usernameInput, passwordInput, loginButton) {
	const { username, password, lastTry } = await getData({
		username: "",
		password: "",
		lastTry: 0,
	});

	if (username && password) {
		usernameInput.value = username;
		passwordInput.value = password;
	}

	if (Date.now() - lastTry > 10000) {
		console.log("auto login");
		await setData({ lastTry: Date.now() });
		loginButton.click();
	} else {
		console.warn("no auto login: recent failed attempt");
	}
}
