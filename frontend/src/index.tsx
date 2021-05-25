import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";

declare global {
	namespace JSX {
		interface IntrinsicElements {
			"app-naktoolsbadge": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			>;
		}
	}
}

const theme = createMuiTheme({
	palette: {
		type: "dark",
		background: {
			paper: "#34444c",
			default: "#263238",
		},

		primary: blue,
	},
});

ReactDOM.render(
	<ThemeProvider theme={theme}>
		<App />
		<app-naktoolsbadge
			text-color={theme.palette.text.primary}
			background-color={theme.palette.background.paper}
		/>
	</ThemeProvider>,
	document.getElementById("root")
);
