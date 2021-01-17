import React from 'react';
import { useEffect } from 'react/cjs/react.development';

function ThicknessGraph(props) {

	useEffect(() => {
		if (props.thresholdData) {
			const canvas = document.querySelector('#ThicknessGraph');

			if (canvas.getContext('2d')) {
				let ctx = canvas.getContext('2d');

				//Draw rectangle with gradient
				var gradient = ctx.createLinearGradient(0, 0, 0, 680);
				gradient.addColorStop(.1, 'green');
				gradient.addColorStop(.4, 'yellow');
				gradient.addColorStop(.9, 'red');
				
				ctx.fillStyle= gradient;
				ctx.fillRect(10, 10, 50, 680);

				//draw tick lines
				// top
				ctx.beginPath();
				ctx.moveTo(40, 160);
  				ctx.lineTo(70, 160);
				ctx.stroke();
				
				// bottom
				ctx.beginPath();
				ctx.moveTo(40, 550);
  				ctx.lineTo(70, 550);
				ctx.stroke();
				
				ctx.fillStyle = '#000';
				// draw number top ledger
				ctx.fillText('0.33in', 75, 163, 50)
				
				// draw number bottom ledger
				ctx.fillText('0.22in', 75, 553, 50)
			}
		}
	})
	

	return (
		<div className="container" style={{marginLeft: '750px'}}>
			<canvas id="ThicknessGraph" width="120px" height="700px"></canvas>
		</div>
	)
}

export default ThicknessGraph;