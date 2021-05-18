class ShowNextCourses {
	constructor(centuria, semester) {
		this.centuria = centuria;
		this.semester = semester;
		this.panel = new NextCoursesPanel(this.stopUpdates.bind(this));
		this.setCourseElms();
		this.updateSchedule().then((e) => {
			this.updateNextCourses();
		});

		this.updateScheduleInterval = setInterval(
			this.updateSchedule.bind(this),
			1000 * 60 * 60 * 5 // update every five hours;
		);
		this.updateCoursesInterval = setInterval(
			this.updateNextCourses.bind(this),
			1000 * 60 * 10 // update every ten minutes;
		);
	}

	stopUpdates() {
		clearInterval(this.updateCoursesInterval);
		clearInterval(this.updateScheduleInterval);
	}

	setCourseElms() {
		const start = document.querySelector(
			`#nav-drawer > nav > ul > li > div[data-key="mycourses"]`
		).parentElement;
		const end = document.querySelector(
			`#nav-drawer > nav > ul > li > a[data-key="courseindexpage"]`
		).parentElement;

		const courseElms = [];

		let course = start.nextElementSibling;
		while (course != null && course !== end) {
			courseElms.push(course.firstElementChild);
			course = course.nextElementSibling;
		}
		this.courseElms = courseElms;
	}

	async updateSchedule() {
		try {
			const res = await fetch(
				`https://schedule-cleaner.herokuapp.com/cleaned-schedule/${this.centuria}_${this.semester}.ics`
			);
			if (!res.ok) throw "URL not available";
			const buffer = await res.arrayBuffer();
			const rawSchedule = new TextDecoder("iso-8859-1").decode(buffer);
			const schedule = ical.parseICS(rawSchedule);
			this.schedule = schedule;
		} catch {
			this.schedule = null;
		}
	}

	async updateNextCourses() {
		this.panel.clearCourses();

		if (!this.schedule) {
			this.panel.showMessage(
				`Failed to load schedule for centuria: ${this.centuria}, semester: ${this.semester}`
			);
			return null;
		}

		for (let event of Object.values(this.schedule)) {
			if (this.isNextEvent(event)) {
				const course = this.findCourseForSubject(event.summary);
				if (course) {
					this.panel.addCourse(course);
				}
			}
		}
	}

	isNextEvent(event) {
		const currentTime = new Date();
		return (
			event.type === "VEVENT" &&
			event.start < new Date().setHours(currentTime.getHours() + 3) &&
			event.end > currentTime
		);
	}

	findCourseForSubject(subjectName) {
		for (const courseElm of this.courseElms) {
			const courseName = courseElm.querySelector(
				"div > div > span.media-body"
			).innerText;

			if (courseName.includes(subjectName)) {
				const courseElmClone = courseElm.cloneNode(true);
				courseElmClone.classList.remove("active");
				return courseElmClone;
			}
		}
		return null;
	}
}
