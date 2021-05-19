import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./HeaderStyles";

export default function Header() {
	const classes = useStyles();
	return (
		<Box p={2}>
			<Grid className={classes.header} container spacing={4}>
				<Grid item>
					<img
						className={classes.headerImg}
						src="assets/NAKExtension.svg"
						alt="Schedule Cleaner"
					/>
				</Grid>
				<Grid item className={classes.headerText}>
					<Typography variant="h5" color="textSecondary">
						Enhance Moodle, Cis and Owa with this Chrome extension. Features
						include auto login, Moodle course suggestions and more.
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
