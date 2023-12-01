import React, { useCallback, useEffect } from "react";
import "gantt-schedule-timeline-calendar/dist/style.css";

let GSTC, gstc, state;

async function initializeGSTC(element) {
  GSTC = (await import("gantt-schedule-timeline-calendar")).default;
  const TimelinePointer = (await import("gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js"))
    .Plugin;
  const Selection = (await import("gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js")).Plugin;
  const ItemResizing = (await import("gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js")).Plugin;
  const ItemMovement = (await import("gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js")).Plugin;

  // helper functions

  const date = GSTC.api.date;
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */

  const colors = ['#E74C3C', '#DA3C78', '#7E349D', '#0077C0', '#07ABA0', '#0EAC51', '#F1892D'];

  function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

  const itemsFromDB = [
    // {
    //   id: "1",
    //   label: "Item 1 <br/> Test",
    //   description: 'bro can you just show for me',
    //   style: { background: getRandomColor() },
    //   rowId: "1",
    //   // height:300,
    //   time: {
    //     start: GSTC.api.date("2023-01-01").startOf("day").valueOf(),
    //     end: GSTC.api.date("2023-01-01").endOf("day").valueOf(),
    //   },
    // },
    {
      id: "2",
      label: "Item 2",
      rowId: "1",
      height: 130,
      style: { background: getRandomColor() },
      time: {
        start: GSTC.api.date("2023-01-01").startOf("day").valueOf(),
        end: GSTC.api.date("2023-01-01").startOf("day").add(8, "hours").valueOf(),
      },
      description: "wow this is a cool boi",
    },
    {
      id: "3",
      label: 'John Doe',
      rowId: "1",
      height: 130,
      time: {
        start: GSTC.api.date("2023-01-01").startOf("day").add(9, "hours").valueOf(),
        end: GSTC.api.date("2023-01-01").endOf("day").valueOf(),
      },
      description: 'Lorem ipsum dolor sit amet',
    },
  ];
  
  const rowsFromDB = [
    {
      id: "1",
      label: "Row 1",
      height:400,
    },
  ];

  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
    innerHeight: 150,
    width: 500,
    height: 150,
    headerHeight: 50,
    width: 50,
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {},
      rows: GSTC.api.fromArray(rowsFromDB),      // rows: generateRows(),
    },
    chart: {
      time: {
        zoom: 16.05,
        onLevelDates: [({ dates }) => dates],
        onCurrentViewLevelDates: [({ dates }) => dates],
        onDate: [({ date }) => date],

      },
      items: GSTC.api.fromArray(itemsFromDB),    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

const Gantt = () => {
  const callback = useCallback((element) => {
    if (element) initializeGSTC(element);
  }, []);
  
  return (
    <div className="container">
      <hr />
      <div id="gstc" ref={callback}></div>
    </div>
  );
};

export default Gantt;

// return (content) =>
// html`<div
//     class="item-image"
//     style="background:url(${imageSrc}),transparent;flex-shrink:0;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: 4px 11px 0px 0px;"
//   ></div>
//   <div class="item-text">
//     <div class="item-label">${content}</div>
//     <div class="item-description" style="font-size:11px;margin-top:2px;color:#fffffff0;line-height:1em;">
//       ${description}
//     </div>
//   </div>`;


























// function generateRows() {
  //   /**
  //    * @type { import("gantt-schedule-timeline-calendar").Rows }
  //    */
  //   const rows = {};
  //   for (let i = 0; i < 100; i++) {
  //     const id = GSTC.api.GSTCID(i.toString());
  //     rows[id] = {
  //       id,
  //       label: `Row ${i}`,
  //     };
  //   }
  //   return rows;
  // }
  // function generateItems() {
  //   /**
  //    * @type { import("gantt-schedule-timeline-calendar").Items }
  //    */
  //   const items = {};
  //   // @ts-ignore
  //   let start = GSTC.api.date().startOf("day").subtract(1, "day");
  //   for (let i = 0; i < 100; i++) {
  //     const id = GSTC.api.GSTCID(i.toString());
  //     const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 100).toString());
  //     start = start.add(1, "day");
  //     items[id] = {
  //       id,
  //       label: `Item ${i}`,
  //       rowId,
  //       time: {
  //         start: start.valueOf(),
  //         end: start.add(1, "day").endOf("day").valueOf(),
  //       },
  //     };
  //   }
  //   return items;
  // }

//   const columnsFromDB = [
//     {
//       id: "id",
//       label: "ID",
//       data: ({ row }) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
//       sortable: ({ row }) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
//       width: 80,
//       header: {
//         content: "ID",
//       },
//     },
//     {
//       id: "label",
//       data: "label",
//       sortable: "label",
//       isHTML: false,
//       width: 230,
//       height: 300,
//       header: {
//         content: "Label",
//       },
//     },
//   ];

// function updateFirstRow() {
//     if (!GSTC || !state) return;
//     state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
//       row.label = "Changed dynamically";
//       return row;
//     });
//   }