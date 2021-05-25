async function attemptLogin(usernameInput, passwordInput, loginButton) {
	const { username, password, autoLogin, lastTry } = await getData({
		username: "",
		password: "",
		autoLogin: false,
		lastTry: 0,
	});

	if (!username || !password || !autoLogin) return;

	usernameInput.value = username;
	passwordInput.value = password;

	if (Date.now() - lastTry > 10000) {
		await setData({ lastTry: Date.now() });
		loginButton.click();
	} else {
		console.log("no auto login: recent failed attempt");
	}
}
