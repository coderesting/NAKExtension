async function init() {
	fillSidebar();
	const { centuria, semester, showNextCoursesInMoodle } = await getData({
		centuria: "",
		semester: "",
		showNextCoursesInMoodle: false,
	});
	if (
		centuria &&
		semester &&
		showNextCoursesInMoodle &&
		document.querySelector("#nav-drawer > nav > ul > li > div")
	) {
		new ShowNextCourses(centuria, semester);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
