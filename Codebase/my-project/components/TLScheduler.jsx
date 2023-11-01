import React, { useEffect } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import * as ReactDOM from 'react-dom';

const groups = [{ id: 1 }];

const items = [
  {
    id: 1,
    group: 1,
    title: 'item 1',
    start_time: moment(),
    end_time: moment().add(1, 'hour'),
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
      // these optional attributes are passed to the root <div /> of each item as <div {...itemProps} />
      'data-custom-attribute': 'Random content',
      'aria-hidden': true,
      onDoubleClick: () => { console.log('You clicked double!') },
      className: 'weekend',
      style: {
        background: 'fuchsia'
      }
    }
  },

  {
    id: 3,
    group: 1,
    title: 'item 3',
    start_time: moment().add(2, 'hour'),
    end_time: moment().add(3, 'hour'),
  },
];

function MyTimeline() {
  useEffect(() => {
    ReactDOM.render(
      <div>
        Schedule Timeline
        <Timeline
          groups={groups}
          items={items}
          timelineContext="timelineWidth:600" // figure out how to adjust this boi
          lineHeight={70}                     // Height of the scheduler
          defaultTimeStart={moment().add(-12, 'hour')}
          defaultTimeEnd={moment().add(12, 'hour')}
        />
      </div>,
      document.getElementById('root')
    );
  }, []); // This effect runs once on component mount, ensuring it runs on the client side

  return null; // This component doesn't render anything directly
}

export default MyTimeline;
