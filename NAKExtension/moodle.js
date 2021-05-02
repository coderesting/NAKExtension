const nameInput = document.getElementById("username");
const passInput = document.getElementById("password");
const button = document.getElementById("loginbtn");

chrome.storage.sync.get(
	{
		username: "",
		password: "",
		lastTry: 0,
	},
	function (items) {
		if (items.username && items.password && nameInput && passInput) {
			nameInput.value = items.username;
			passInput.value = items.password;
		}

		console.log(Date.now() - items.lastTry);

		if (Date.now() - items.lastTry > 5000 && button) {
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
