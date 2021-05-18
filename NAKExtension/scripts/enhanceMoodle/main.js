async function init() {
	fillSidebar();
	const { centuria, semester } = await getData();
	if (
		centuria &&
		semester &&
		document.querySelector("#nav-drawer > nav > ul > li > div")
	) {
		new ShowNextCourses(centuria, semester);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
