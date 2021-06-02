function getSideBarinfo() {
	const courseStart = document.querySelector(
		`#nav-drawer > nav > ul > li > div[data-key="mycourses"]`
	)?.parentElement;
	const courseEnd = document.querySelector(
		`#nav-drawer > nav > ul > li > a[data-key="courseindexpage"]`
	)?.parentElement;
	if (!courseStart || !courseEnd) {
		return null;
	}
	const courseElms = [];

	let course = courseStart.nextElementSibling;
	while (course != null && course !== courseEnd) {
		courseElms.push(course.firstElementChild);
		course = course.nextElementSibling;
	}

	return {
		courseStart,
		courseEnd,
		courseElms,
	};
}
