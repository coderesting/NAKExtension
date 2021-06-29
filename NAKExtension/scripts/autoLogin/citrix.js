function init() {
	const nameInput = document.getElementById("login");
	const passInput = document.getElementById("passwd");
	const loginButton = document.getElementById("nsg-x1-logon-button");

	if (nameInput && passInput && loginButton) {
		console.log("attempt login");
		attemptLogin(nameInput, passInput, loginButton);
	} else {
		console.log("retry");
		setTimeout(init, 500);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
