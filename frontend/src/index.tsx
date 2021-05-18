import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { createMuiTheme, CssBaseline, ThemeProvider } from "@material-ui/core";

const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		background: {
			default: "#263238",
		},
		primary: {
			light: "#039BE5",
			main: "#039BE5",
			dark: "#039BE5",
		},
	},
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={darkTheme}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById("root")
);
