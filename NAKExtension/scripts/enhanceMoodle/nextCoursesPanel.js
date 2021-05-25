class NextCoursesPanel {
	constructor(closeCallback) {
		this.addPanel();
		this.closeCallback = closeCallback;
	}
	addPanel() {
		this.panel = document.createElement("div");
		this.panel.id = "nextCoursesPanel";

		this.panel.innerHTML = `
			<div class="nextCoursesHeader">
				<h2>Next Courses:</h2>
				<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000">
					<path d="M0 0h24v24H0z" fill="none"/>
					<path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
				</svg>
			</div>
			
			
			<div class="nextCoursesWrapper">
				
			</div>
	`;
		this.courseWrapper = this.panel.querySelector(".nextCoursesWrapper");
		const closeButton = this.panel.querySelector("svg");
		closeButton.addEventListener("click", this.closePanel.bind(this));
		document.body.appendChild(this.panel);
	}

	closePanel() {
		this.panel.classList.remove("open");
		this.closeCallback();
	}

	clearCourses() {
		this.courseWrapper.innerHTML = "";
	}

	addCourse(courseElm) {
		this.panel.classList.add("open");
		this.courseWrapper.appendChild(courseElm);
	}

	showMessage(text) {
		this.panel.classList.add("open");
		this.courseWrapper.innerHTML = `<span>${text}</span>`;
	}
}
