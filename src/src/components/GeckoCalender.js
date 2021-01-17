import '../App.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import { useState, useEffect } from 'react'
import moment from 'moment';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import * as eventActions from '../actions/eventActions';
import eventStore from '../stores/eventStore';

function GeckoCalender() {
	const [events, setEvents] = useState(eventStore.getEvents());
	const localizer = momentLocalizer(moment);

	useEffect(() => {
		eventStore.addChangeListener(onChange);
		
		if (events.length === 0) { 
			eventActions.loadEvents();
		}
		
		// cleanup component
		return () => {
			eventStore.removeChangeListener(onChange)
		}
	}, [events.length]);

	function onChange() {
		setEvents(eventStore.getEvents());
	}

// 	let Basic = ({ localizer }) => (
// 	<Calendar
// 		events={events}
// 		views={allViews}
// 		step={60}
// 		showMultiDayTimes
// 		max={dates.add(dates.endOf(new Date(2015, 17, 1), 'day'), -1, 'hours')}
// 		defaultDate={new Date(2015, 3, 1)}
// 		components={{
// 		timeSlotWrapper: ColoredDateCellWrapper,
// 		}}
// 		localizer={localizer}
// 	/>
// )

  return (
    <div className="App">
      <div>
		<h2>Calendar</h2> 
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
			style={{ height: 500 }}
			defaultDate={new Date(2021, 0, 1)}
        />
      </div>
    </div>
  );
}

export default GeckoCalender;