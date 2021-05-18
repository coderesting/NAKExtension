class Options {
	constructor() {
		this.usernameInput = document.getElementById("username");
		this.passwordInput = document.getElementById("password");
		this.centuriaInput = document.getElementById("centuria");
		this.semesterInput = document.getElementById("semester");

		this.statusElm = document.getElementById("status");
	}

	async save() {
		await setData({
			username: this.usernameInput.value,
			password: this.passwordInput.value,
			centuria: this.centuriaInput.value,
			semester: this.semesterInput.value,
		});

		this.statusElm.textContent = "Options saved locally.";
		setTimeout(() => {
			this.statusElm.textContent = "";
		}, 750);
	}

	async load() {
		const { username, password, centuria, semester } = await getData({
			username: "",
			password: "",
			centuria: "",
			semester: "",
		});

		this.usernameInput.value = username;
		this.passwordInput.value = password;
		this.centuriaInput.value = centuria;
		this.semesterInput.value = semester;
	}
}

function init() {
	const options = new Options();
	options.load();
	const saveButton = document.getElementById("save");
	saveButton.addEventListener("click", options.save.bind(options));
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
