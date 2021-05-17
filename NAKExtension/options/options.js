function save_options() {
	var username = document.getElementById("username").value;
	var password = document.getElementById("password").value;
	chrome.storage.local.set(
		{
			username,
			password,
		},
		function () {
			var status = document.getElementById("status");
			status.textContent = "Options saved locally.";
			setTimeout(function () {
				status.textContent = "";
			}, 750);
		}
	);
}

function restore_options() {
	chrome.storage.local.get(
		{
			username: "",
			password: "",
		},
		function (items) {
			document.getElementById("username").value = items.username;
			document.getElementById("password").value = items.password;
		}
	);
}
document.addEventListener("DOMContentLoaded", restore_options);
document.getElementById("save").addEventListener("click", save_options);
