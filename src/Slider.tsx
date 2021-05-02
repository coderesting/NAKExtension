import { makeStyles, MobileStepper, Typography } from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import Button from "@material-ui/core/Button";
import SwipeableViews from "react-swipeable-views";
import React, { useState } from "react";
import tutorialSteps from "./tutorialSteps";

const useStyles = makeStyles((theme) => ({
	slider: {
		maxWidth: 600,
		margin: "auto",
	},
	header: {
		height: 50,
		display: "flex",
		alignItems: "flex-end",
		marginBottom: 5,
	},
	img: {
		height: "100%",
		width: "100%",
		borderRadius: 10,
		cursor: "grab",
		userSelect: "none",
	},
}));

function Slider() {
	const classes = useStyles();
	const [activeStep, setActiveStep] = useState(0);

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};

	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};

	return (
		<div className={classes.slider}>
			<Typography className={classes.header}>
				{tutorialSteps[activeStep].description}
			</Typography>

			<SwipeableViews
				index={activeStep}
				onChangeIndex={setActiveStep}
				enableMouseEvents
			>
				{tutorialSteps.map((step, index) => {
					const parts = step.imgPath.split(".");
					const extension = parts[parts.length - 1];
					return extension === "mp4" ? (
						<div key={index}>
							<video
								key={index}
								muted
								autoPlay
								loop
								className={classes.img}
								src={step.imgPath}
							/>
						</div>
					) : (
						<div key={index}>
							<img
								className={classes.img}
								src={step.imgPath}
								alt="Explanation about the text above"
							/>
						</div>
					);
				})}
			</SwipeableViews>

			<MobileStepper
				variant="progress"
				steps={tutorialSteps.length}
				position="static"
				activeStep={activeStep}
				nextButton={
					<Button
						size="small"
						onClick={handleNext}
						disabled={activeStep === tutorialSteps.length - 1}
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
