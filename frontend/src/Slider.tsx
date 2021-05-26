import { MobileStepper, Typography, useTheme } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import React, { useState } from "react";
import useStyles from "./SliderStyles";

function Slider(props: { steps: { description: string; imgPath: string }[] }) {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);
	const theme = useTheme();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className={classes.slider}>
			<Typography className={classes.header}>
				{props.steps[activeStep].description}
			</Typography>

			<SwipeableViews
				index={activeStep}
				onChangeIndex={setActiveStep}
				enableMouseEvents
			>
				{props.steps.map((step, index) => {
					const parts = step.imgPath.split(".");
					const extension = parts[parts.length - 1];
					return extension === "mp4" ? (
						<video
							key={index}
							muted
							autoPlay
							loop
							className={classes.img}
							src={step.imgPath}
						/>
					) : (
						<img
							key={index}
							className={classes.img}
							src={step.imgPath}
							alt="Explanation about the text above"
						/>
					);
				})}
			</SwipeableViews>

			<MobileStepper
				variant="dots"
				steps={props.steps.length}
				position="static"
				activeStep={activeStep}
				style={{ backgroundColor: theme.palette.background.paper }}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === props.steps.length - 1}
						endIcon={<KeyboardArrowRight />}
					>
						Next
					</Button>
				}
				backButton={
					<Button
						size="small"
						onClick={handleBack}
						disabled={activeStep === 0}
						startIcon={<KeyboardArrowLeft />}
					>
						Back
					</Button>
				}
			/>
		</div>
	);
}

export default Slider;
