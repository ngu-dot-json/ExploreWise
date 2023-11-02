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
    canMove: true,
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
  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
];

onPrevClick = () => {
  this.setState((state) => {
    const zoom = state.visibleTimeEnd - state.visibleTimeStart;
    return {
      visibleTimeStart: state.visibleTimeStart - zoom,
      visibleTimeEnd: state.visibleTimeEnd - zoom
    };
  });
};

onNextClick = () => {
  this.setState((state) => {
    const zoom = state.visibleTimeEnd - state.visibleTimeStart;
    console.log({
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    });
    return {
      visibleTimeStart: state.visibleTimeStart + zoom,
      visibleTimeEnd: state.visibleTimeEnd + zoom
    };
  });
};



function MyTimeline() {
  useEffect(() => {
    ReactDOM.render(
      <div>
        <div className="timeline-container">
          Schedule Timeline
          <button onClick={onPrevClick}>{"< Prev"}</button>
          <button onClick={onNextClick}>{"Next >"}</button>
          <Timeline
            groups={groups}
            items={items}
            lineHeight={70}
            sidebarWidth={0}
            //defaultTimeStart={(7)}
            defaultTimeStart={moment().startOf("day").valueOf()}
            defaultTimeEnd={moment().startOf("day").add(1, "day").valueOf()}
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
