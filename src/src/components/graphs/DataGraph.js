import { useState, useEffect} from 'react';
import eventStore from '../../stores/eventStore';
import * as eventActions from '../../actions/eventActions';
import ThicknessGraph from './ThicknessGraph/ThicknessGraph';
import HeatGraph from './HeatGraph';

function DataGraph() {
	const [gridData, setGridData] = useState(eventStore.getGridData());
	const [heatmapData, setHeatmapData] = useState({});
	const [min, setMin] = useState(0);
	const [max, setMax] = useState(0);

	const config = {
		max: max,
		min: min,
		title: gridData.title,
		x_label: gridData.x_label,
		y_label: gridData.y_label
	}
	
	useEffect(() => {

		eventStore.addChangeListener(onChange);

		if (gridData.length === 0) {
			eventActions.loadGridData();
		}

		return () => {
			eventStore.removeChangeListener(onChange);
		}

	}, [gridData.length]);

	

	function onChange() {
		setGridData(eventStore.getGridData());
		setHeatmapData(eventStore.processHeatMapData());
		setMin(eventStore.getMinMax()._min);
		setMax(eventStore.getMinMax()._max);
	}
	
	return (
		<>
			<h1>{config.title}</h1>
			<div className="flex-container" style={{flexDirection: 'row'}}>
				<HeatGraph config={config} heatmapData={heatmapData}></HeatGraph>
				<ThicknessGraph thresholdData={gridData.thresholds}></ThicknessGraph>
			</div>
		</>
	)
}

export default DataGraph;

	/*Build out the Data page: 
	There is a data.json file which contains the data for a C-Scan heatmap. 
	Below is an example of what this might look like. 
	You do not need to make it look the same! 
	You will need to have a plot with axis labels and a colorscheme (again not necessarily 
	the same one -- whatever makes sense to you). Hovering over a bin of data should 
	have a tooltip that shows the thickness
	*/

//iterate over data and make objects like this { id: 3, y: -0.5, x: 33.25, thickness: 0.3131999969482422 } 
// { id: iterator, coordinates: {x, y}, thickness: someValue }

// draw empty graph {title, bin_sizes, units, xLabel, yLabel, description: component_type}

// draw thickness color range (cant be css gradient need to know color underneath) draw bar of color bottom to top
// "thresholds": {"start_of_red": 0.22, "start_of_green": 0.3},

// fill graph with colored dots using data objects

    