class ShowNextCourses {
	constructor(sidebarInfo, centuria, semester) {
		this.setSidebarCourseData(sidebarInfo);
		this.centuria = centuria;
		this.semester = semester;

		this.panel = new NextCoursesPanel(this.stopUpdates.bind(this));
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

	setSidebarCourseData(sidebarInfo) {
		this.courseElms = [];
		this.courseNames = [];

		for (const courseElm of sidebarInfo.courseElms) {
			const courseName = courseElm.querySelector(
				"div > div > span.media-body"
			).innerText;
			if (!courseName.toLowerCase().includes("tutorium")) {
				this.courseElms.push(courseElm);
				this.courseNames.push(courseName);
			}
		}
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
		} catch (e) {
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
				const name = event.summary;
				const tutor = event.description.match(/Dozent:(.*?)\n/)?.[1];
				const course = this.findCourseForSubject(name, tutor);
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
			event.start < new Date().setHours(currentTime.getHours() + 10) &&
			event.end > currentTime
		);
	}

	findCourseForSubject(subjectName, tutorName) {
		let similarities = stringSimilarity.findBestMatch(
			subjectName,
			this.courseNames
		);
		if (similarities.bestMatch.rating < 0.3 && tutorName) {
			similarities = stringSimilarity.findBestMatch(
				tutorName,
				this.courseNames
			);
		}
		if (similarities.bestMatch.rating < 0.23) return null;

		const courseElm = this.courseElms[similarities.bestMatchIndex];

		if (window.location.href.includes(courseElm.getAttribute("href")))
			return null;

		return courseElm.cloneNode(true);
	}
}
