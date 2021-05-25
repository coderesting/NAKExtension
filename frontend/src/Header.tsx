import { Box, Grid, Typography } from "@material-ui/core";
import React from "react";
import useStyles from "./HeaderStyles";

export default function Header(props: {
	img: string;
	imgAlt?: string;
	text: string;
}) {
	const classes = useStyles();
	return (
		<Box p={2}>
			<Grid className={classes.header} container spacing={4}>
				<Grid item>
					<img
						className={classes.headerImg}
						src={props.img}
						alt={props.imgAlt}
					/>
				</Grid>
				<Grid item className={classes.headerText}>
					<Typography variant="h5" color="textSecondary">
						{props.text}
					</Typography>
				</Grid>
			</Grid>
		</Box>
	);
}
