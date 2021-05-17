function init() {
	const nameInput = document.getElementById("login");
	const passInput = document.getElementById("passwd");
	const loginButton = document.getElementById("nsg-x1-logon-button");

	if (nameInput && passInput && loginButton) {
		attemptLogin(nameInput, passInput, loginButton);
	} else {
		setTimeout(init, 500);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
