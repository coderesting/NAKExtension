function init() {
	const nameInput = document.getElementById("username");
	const passInput = document.getElementById("password");
	const loginButton = document.getElementById("loginbtn");

	if (nameInput && passInput && loginButton) {
		attemptLogin(nameInput, passInput, loginButton);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
