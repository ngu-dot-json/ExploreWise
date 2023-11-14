import React, { useEffect } from 'react';
//import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css'; // Keep this line for the default styles
import moment from 'moment';
import * as ReactDOM from 'react-dom';
// import '../Timeline.css';


import Timeline, {
  TimelineHeaders,
  SidebarHeader,
  DateHeader
} from 'react-calendar-timeline'

// Define your groups and items
const groups = [{ id: 1 }];

const items = [
  {
    id: 1,
    group: 1,
    title: 'Title',
    tip: 'additional information',
    color: 'rgb(158, 14, 206)',
    selectedBgColor: 'rgba(, 166, 244, 1)',
    bgColor : 'rgba(225, 166, 244, 0.6)',
  },
  {
    id: 2,
    group: 1,
    title: 'Random title',
    start_time: moment().add(4, 'hour'),
    end_time: moment().add(8, 'hour'),
    canMove: false,
    canResize: false,
    canChangeGroup: false,
    itemProps: {
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia',
      },
    },
  },
];


// prevent scrolling function
const minTime = moment().startOf("day").valueOf()
const maxTime = moment().startOf("day").add(1, "day").valueOf()

function time (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) {
  if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
    updateScrollCanvas(minTime, maxTime)
  } else if (visibleTimeStart < minTime) {
    updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
  } else if (visibleTimeEnd > maxTime) {
    updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
  } else {
    updateScrollCanvas(visibleTimeStart, visibleTimeEnd)
  }
}

function MyTimeline() {
  useEffect(() => {
    ReactDOM.render(
      <div className='timeline-container'>
        <div className="timeline-container">
          <h1>Schedule Timeline</h1>

          <Timeline
            groups={groups}
            items={items}
            lineHeight={200}
            sidebarWidth={0}
            defaultTimeStart={moment().startOf("day").valueOf()}
            defaultTimeEnd={moment().startOf("day").add(1, "day").valueOf()}
            visibleTimeStart={moment().startOf("day").valueOf()}
            visibleTimeEnd={moment().startOf("day").add(1, "day").valueOf()}
            canvasTimeStart={moment().startOf("day").valueOf()}
            canvasTimeEnd={moment().startOf("day").add(1, "day").valueOf()}
          />

        </div>
      </div>,
      document.getElementById('root')
    );
  },
  );
  

  return null;
}

export default MyTimeline;
