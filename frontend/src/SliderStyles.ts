import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
	slider: {
		maxWidth: 600,
		margin: "auto",
	},
	header: {
		height: 50,
		display: "flex",
		alignItems: "flex-end",
		margin: 5,
	},
	img: {
		display: "block",
		height: "100%",
		width: "100%",
		cursor: "grab",
		userSelect: "none",
	},
}));
