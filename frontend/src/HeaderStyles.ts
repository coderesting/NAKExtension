import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	header: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(2, 0, 2),
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
	},
	headerImg: {
		width: 150,
	},
	headerText: {
		maxWidth: 410,
		minWidth: 410,
		[theme.breakpoints.down("xs")]: {
			textAlign: "center",
			minWidth: "auto",
		},
	},
}));

export default useStyles;
