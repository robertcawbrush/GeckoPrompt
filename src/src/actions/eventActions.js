import dispatcher from '../dispatcher';
import * as api from '../api/api';
import actionTypes from './ActionTypes';

export function loadGridData() {
	api.fetchGridData()
		.then(gridData => {
			dispatcher.dispatch({
				actionType: actionTypes.GET_GRID_DATA,
				gridData
			});
		})
		.catch(err => {
			console.log('an error occured fetching grid data: ' + err);
		});
}

export function loadEvents() {
	// method that uses the real url
	// return api.fetchRealEvents()

	// method that uses mock data
	api
    .fetchMockEdatavents()
    .then((events) => {
      dispatcher.dispatch({
        actionType: actionTypes.GET_EVENTS,
        events,
      });
    })
    .catch((err) => {
      console.log("an error occured fetching events: " + err);
    });
}