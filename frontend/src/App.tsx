import {
	Box,
	Container,
	CssBaseline,
	Paper,
	Tab,
	Tabs,
	useTheme,
} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "./Slider";
import React, { useState } from "react";
import Header from "./Header";
import tutorialSteps from "./tutorialSteps";
import featureSteps from "./featureSteps";

function App() {
	const [currentTab, setCurrentTab] = useState(0);
	const theme = useTheme();
	return (
		<>
			<CssBaseline />
			<main>
				<Header />

				<Box display="flex" justifyContent="center" m={2}>
					<Button
						href="https://github.com/coderesting/NAKExtension/releases"
						style={{ textTransform: "none" }}
						variant="outlined"
						color="primary"
						autoCapitalize="true"
					>
						Download
					</Button>
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
			</main>
		</>
	);
}

export default App;
