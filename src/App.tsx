import { Box, Typography } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Slider from "./Slider";
import packageJson from "../package.json";

function App() {
	return (
		<div className="App">
			<Box m={3}>
				<Typography align="center" variant="h4">
					NAK Extension
				</Typography>
			</Box>

			<Box m={3}>
				<Slider />
			</Box>

			<Box display="flex" justifyContent="center">
				<a
					href={`./assets/NAKExtension_${packageJson.version}.zip`}
					download
					style={{ textDecoration: "none" }}
				>
					<Button
						style={{ textTransform: "none" }}
						variant="contained"
						color="primary"
						autoCapitalize="true"
					>
						Download v{packageJson.version}
					</Button>
				</a>
			</Box>
		</div>
	);
}

export default App;
