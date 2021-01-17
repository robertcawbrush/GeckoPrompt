import { EventEmitter } from 'events';
import dispatcher from "../dispatcher";
import actionType from '../actions/ActionTypes'

const CHANGE_EVENT = "change";

let _events = []; 
let _gridData = [];
let _min = 0;
let _max = 0;

class EventStore extends EventEmitter {

	addChangeListener(callback) {
		this.on(CHANGE_EVENT, callback);
	}

	removeChangeListener(callback) {
		this.removeListener(CHANGE_EVENT, callback);
	}

	emitChange() {
		this.emit(CHANGE_EVENT);
	}

	getEvents() {
		return _events;
	}

	getGridData() {
		return _gridData;
	}

	getMinMax() {
		return {_min, _max}
	}

	processHeatMapData() {
		return createDataObject(_gridData);
	}

 }

function createDataObject(gridData) {
	let tempData = [];
	let max = 0;
	let min = 0;

	const valueFactor = 100;

	// TODO: find out what customer_x(y) is and how it differs from x(y)_bin
	// I compared the values together and all 50k entries where the same

	for (let i = 0; i < gridData.data.thickness.length; i++) {

		if (gridData.data.thickness[i - 1]) {
			max = gridData.data.thickness[i] > max ? gridData.data.thickness[i] * valueFactor : max;
			min = gridData.data.thickness[i] < min ? gridData.data.thickness[i] * valueFactor : min;
		}

		// thse plots are factored by 10 to put them in a visible pixel range
		const tempObject = {
			x: gridData.data.plot_x[i] * 10, 
			y: gridData.data.plot_y[i] * 10,
			value: gridData.data.thickness[i] * valueFactor
		}
		tempData.push(tempObject);
	}

	_max = max;
	_min = min;

	return tempData;

}

const eventStore = new EventStore();

dispatcher.register(action => {
	switch (action.actionType) {
		case actionType.GET_EVENTS:
			_events = action.events;
			eventStore.emitChange();
			break;
		case actionType.GET_GRID_DATA:
			_gridData = action.gridData;
			eventStore.emitChange();
			break;
		default:
	}
});

export default eventStore;