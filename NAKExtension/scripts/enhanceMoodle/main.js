async function init() {
	let sidebarInfo = getSideBarinfo();
	if (!sidebarInfo) return;

	await fillSidebar(sidebarInfo);
	sidebarInfo = getSideBarinfo();

	const { centuria, semester, showNextCoursesInMoodle } = await getData({
		centuria: "",
		semester: "",
		showNextCoursesInMoodle: false,
	});
	if (centuria && semester && showNextCoursesInMoodle) {
		new ShowNextCourses(sidebarInfo, centuria, semester);
	}
}

if (document.readyState === "loading")
	document.addEventListener("DOMContentLoaded", init);
else init();
