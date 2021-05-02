const nameInput = document.getElementById("user");
const passInput = document.getElementById("pass");
const button = document.querySelector("input[type=submit]");

if (nameInput && passInput && button) {
	chrome.storage.sync.get(
		{
			username: "",
			password: "",
			lastTry: 0,
		},
		function (items) {
			if (items.username && items.password) {
				nameInput.value = items.username;
				passInput.value = items.password;
			}

			console.log(Date.now() - items.lastTry);

			if (Date.now() - items.lastTry > 10000) {
				console.log("auto login");
				chrome.storage.sync.set(
					{
						lastTry: Date.now(),
					},
					() => {
						button.click();
					}
				);
			} else {
				console.log("no auto login: recent failed attempt");
			}
		}
	);
}
