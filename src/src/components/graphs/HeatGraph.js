import React from 'react';
import { useEffect } from 'react/cjs/react.development';
import h337 from "heatmap.js";
import ToolTip from './tooltip';
import AxisCanvas from './AxisCanvas';

function HeatGraph(props) {


	useEffect(() => {

		if (props.heatmapData.length > 0) {

			// draw data
			const heatmapData = h337.create({
				container: document.querySelector('#data-container'),
				radius: 8,
				gradient: {
					'.1': 'red',
					'.3': 'orange',
					'.7': 'yellow',
					'.9': 'green'
				},
				minOpacity: .4,
				width: 800,
				height: 800
			});

			heatmapData.setData({
				data: props.heatmapData,
				max: props.config.max,
				min: props.config.min,

			});


			const heatmapContainer = document.getElementById('containerWrapper');
			if (heatmapContainer) {
				var tooltip = document.querySelector('.tooltip');
				if (tooltip) {
					function updateTooltip(x, y, value) {
						let transl = 'translate(' + (x + 15) + 'px, ' + (y + 15) + 'px)';
						let orignalValue = value * .001 
						tooltip.style.webkitTransform = transl;
						tooltip.innerHTML = `
									x: ${x} 
									y: ${y} 
									value: ${orignalValue}
								`;
					};

					heatmapContainer.onmousemove = function (ev) {
						let x = ev.layerX;
						let y = ev.layerY;
						let value = heatmapData.getValueAt({
							x: x + 100,
							y: y + 100
						});
						tooltip.style.display = 'block';
						updateTooltip(x, y, value);
					};

					heatmapContainer.onmouseout = function () {
						tooltip.style.display = 'none';
					};
				}
			}

			// Draw axis
			const canvas = document.querySelector('#binCanvas');

			if (canvas !== null && canvas.getContext('2d')) {
				
				const ctx = canvas.getContext("2d");

				ctx.width = 800;
				ctx.height = 750;

				//draw vertical axis
				ctx.moveTo(30, 0);
				ctx.lineTo(30, 750);
				ctx.stroke();

				ctx.fillStyle = '#000';
				
				// draw horizontal axis
				ctx.moveTo(30, 750);
				ctx.lineTo(750, 750);
				ctx.stroke();

				ctx.font = '36px serif';

				//draw horizontal text
				ctx.fillText(props.config.x_label, ctx.height / 2 - 50, 778)

				ctx.save();
				
				// draw vertical text
				ctx.translate(ctx.width / 2, ctx.height / 2);
				ctx.rotate((-90) * Math.PI / 180);
				ctx.fillStyle = '#000';
				ctx.fillText(props.config.y_label, -50, -375)
				ctx.restore();
			}
		}

		return (() => {
			// TODO: kill heatgraph
		})

	}, [
		props.heatmapData,
		props.config,
		props.config.min,
		props.config.max,
		props.config.valueField,
		props.config.x_label,
		props.config.y_label
	]);


	return (
		<div id="containerWrapper">
			<div id="data-container"></div>
			<AxisCanvas></AxisCanvas>
			<ToolTip></ToolTip>
		</div>
	)
}

export default HeatGraph;