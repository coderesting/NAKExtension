function init() {
	const nameInput = document.getElementById("user");
	const passInput = document.getElementById("pass");
	const loginButton = document.querySelector("input[type=submit]");

	if (nameInput && passInput && loginButton) {
		attemptLogin(nameInput, passInput, loginButton);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
