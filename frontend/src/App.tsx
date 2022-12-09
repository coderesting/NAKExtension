import {
	Box,
	ButtonGroup,
	Container,
	CssBaseline,
	Paper,
	Tab,
	Tabs,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "./Slider";
import React, { useState } from "react";
import Header from "./Header";
import tutorialSteps from "./tutorialSteps";
import featureSteps from "./featureSteps";

function App() {
	const [currentTab, setCurrentTab] = useState(0);
	return (
		<>
			<CssBaseline />
			<main>
				<Header
					img="assets/NAKExtension-256x256.png"
					text="Enhance Moodle, Cis and Owa with this Browser extension. Features
						include auto login, Moodle course suggestions and more."
				/>

				<Box display="flex" justifyContent="center" m={2}>
					<ButtonGroup color="primary" variant="outlined">
						<Button href="https://chrome.google.com/webstore/detail/nak-extension/plhjgmegekkfofgdjoifdgcjgodfhihj">
							Add to Chrome
						</Button>
						<Button href="./versions/nak_extension-1.3.1.xpi">
							Add to Firefox
						</Button>
					</ButtonGroup>
				</Box>

				<Container maxWidth="sm">
					<Paper elevation={3}>
						<Tabs
							variant="fullWidth"
							value={currentTab}
							indicatorColor="primary"
							textColor="primary"
							onChange={(e, newVal) => setCurrentTab(newVal)}
						>
							<Tab label="Install" />
							<Tab label="Features" />
						</Tabs>

						{currentTab === 0 ? (
							<Slider key={1} steps={tutorialSteps} />
						) : (
							<Slider key={2} steps={featureSteps} />
						)}
					</Paper>
				</Container>

				<Box display="flex" justifyContent="center" m={3}>
					<Button
						href="https://github.com/coderesting/NAKExtension"
						variant="outlined"
						color="primary"
					>
						This project on Github
					</Button>
				</Box>
			</main>
		</>
	);
}

export default App;
