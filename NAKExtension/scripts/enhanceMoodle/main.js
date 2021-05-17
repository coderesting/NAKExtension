function init() {
	fillSidebar();
	showCurrentCourse();
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
