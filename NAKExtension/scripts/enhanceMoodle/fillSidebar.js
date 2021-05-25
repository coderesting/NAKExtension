async function fillSidebar() {
	const moreButton = document.querySelector(
		'#nav-drawer > nav > ul > li > a[data-key="courseindexpage"]'
	)?.parentElement;
	const nav = moreButton?.parentElement;

	if (nav && moreButton) {
		const courses = await getCourses();

		for (let course of courses) {
			if (!courseAlreadyExists(course.href)) {
				const courseElm = createCourseElm(course.title, course.href);
				nav.insertBefore(courseElm, moreButton);
			}
		}
	}
}

async function getCourses() {
	const res = await fetch("https://moodle2.nordakademie.de/my/");
	const text = await res.text();
	const parser = new DOMParser();
	const doc = parser.parseFromString(text, "text/html");
	const courses = doc.querySelectorAll(
		"#coc-courselist .coc-course > div:not(.coc-hidden) h3 > a"
	);
	return Array.from(courses);
}

function courseAlreadyExists(link) {
	return (
		document.querySelector(`#nav-drawer > nav > ul > li > a[href="${link}"]`) !=
		null
	);
}

function createCourseElm(title, link) {
	const course = document.createElement("li");
	course.innerHTML = `
			<a class="list-group-item list-group-item-action  " href="${link}" data-key="3961" data-isexpandable="1" data-indent="1" data-showdivider="0" data-type="20" data-nodetype="1" data-collapse="0" data-forceopen="0" data-isactive="0" data-hidden="0" data-preceedwithhr="0" data-parent-key="574">
				<div class="ml-1">
					<div class="media">
						<span class="media-left"><i class="icon fa fa-graduation-cap fa-fw " aria-hidden="true"></i></span>
						<span class="media-body ">${title}</span>
					</div>
				</div>
			</a>
		`;
	return course;
}
