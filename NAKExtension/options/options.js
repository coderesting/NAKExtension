class Options {
	constructor() {
		this.textInputs = {
			username: document.getElementById("username"),
			password: document.getElementById("password"),
			centuria: document.getElementById("centuria"),
			semester: document.getElementById("semester"),
		};
		this.options = {
			autoLogin: {
				checkbox: document.getElementById("autoLogin"),
				dependencies: [this.textInputs.username, this.textInputs.password],
			},
			notifyOnNewExamGrade: {
				checkbox: document.getElementById("notifyOnNewExamGrade"),
				dependencies: [this.textInputs.username, this.textInputs.password],
			},
			showNextCoursesInMoodle: {
				checkbox: document.getElementById("showNextCoursesInMoodle"),
				dependencies: [this.textInputs.centuria, this.textInputs.semester],
			},
		};

		this.validInputs;

		this.statusElm = document.getElementById("status");
		this.saveButton = document.getElementById("save");

		this.init();
	}

	init() {
		this.load();
		this.saveButton.addEventListener("click", () => this.save());

		for (const { checkbox } of Object.values(this.options)) {
			checkbox.addEventListener("click", () => this.updateRequiredInputs());
		}

		for (const input of Object.values(this.textInputs)) {
			input.addEventListener("input", () => this.updateRequiredInputs());
		}
		this.updateRequiredInputs();
	}

	updateRequiredInputs() {
		let validInputs = true;
		for (const input of Object.values(this.textInputs)) {
			input.classList.remove("is-invalid");
		}

		for (const option of Object.values(this.options)) {
			if (option.checkbox.checked) {
				for (const input of option.dependencies) {
					if (input.value.trim() === "") {
						input.classList.add("is-invalid");
						validInputs = false;
					}
				}
			}
		}

		if (validInputs) {
			this.saveButton.removeAttribute("disabled");
		} else {
			this.saveButton.setAttribute("disabled", true);
		}
	}

	async save() {
		await setData({
			autoLogin: this.options.autoLogin.checkbox.checked,
			notifyOnNewExamGrade: this.options.notifyOnNewExamGrade.checkbox.checked,
			showNextCoursesInMoodle:
				this.options.showNextCoursesInMoodle.checkbox.checked,
			username: this.textInputs.username.value,
			password: this.textInputs.password.value,
			centuria: this.textInputs.centuria.value,
			semester: this.textInputs.semester.value,
		});
		this.statusElm.textContent = "Options saved locally.";
		setTimeout(() => {
			this.statusElm.textContent = "";
		}, 750);
	}

	async load() {
		const {
			autoLogin,
			notifyOnNewExamGrade,
			showNextCoursesInMoodle,
			username,
			password,
			centuria,
			semester,
		} = await getData({
			autoLogin: false,
			notifyOnNewExamGrade: false,
			showNextCoursesInMoodle: false,
			username: "",
			password: "",
			centuria: "",
			semester: "",
		});

		this.options.autoLogin.checkbox.checked = autoLogin;
		this.options.notifyOnNewExamGrade.checkbox.checked = notifyOnNewExamGrade;
		this.options.showNextCoursesInMoodle.checkbox.checked =
			showNextCoursesInMoodle;
		this.textInputs.username.value = username;
		this.textInputs.password.value = password;
		this.textInputs.centuria.value = centuria;
		this.textInputs.semester.value = semester;

		var inputEvent = new Event("input");
		this.textInputs.username.dispatchEvent(inputEvent);
		this.textInputs.password.dispatchEvent(inputEvent);
		this.textInputs.centuria.dispatchEvent(inputEvent);
		this.textInputs.semester.dispatchEvent(inputEvent);
	}
}

function init() {
	new Options();
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
