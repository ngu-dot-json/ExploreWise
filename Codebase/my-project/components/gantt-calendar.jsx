import React, { useRef, useEffect, useState } from "react";
import "gantt-schedule-timeline-calendar/dist/style.css";
import moment from "moment";
let GSTC, gstc, state;

const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

async function initializeGSTC(element, items) {
  GSTC = (await import("gantt-schedule-timeline-calendar")).default;
  const TimelinePointer = (
    await import(
      "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js"
    )
  ).Plugin;
  const Selection = (
    await import(
      "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js"
    )
  ).Plugin;
  const ItemResizing = (
    await import(
      "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js"
    )
  ).Plugin;
  const ItemMovement = (
    await import(
      "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js"
    )
  ).Plugin;

  // helper functions

  const date = GSTC.api.date;
  /**
   * @type { import("gantt-schedule-timeline-calendar").Config }
   */

  const rowsFromDB = [
    {
      id: "1",
      label: "Row 1",
      height: 400,
    },
  ];

  // const items = savedEvents.map((event) => ({
  //   id: event.id,
  //   label: event.name,
  //   description: event.description,
  //   style: { background: getRandomColor() },
  //   rowId: "1",
  //   height: 300,
  //   time: {
  //     start: GSTC.api
  //       .date(event.date)
  //       .startOf("day")
  //       .add(event.timeStart.split(":")[0], "hours")
  //       .add(event.timeStart.split(":")[1], "minutes")
  //       .valueOf(),
  //     end: GSTC.api
  //       .date(event.date)
  //       .startOf("day")
  //       .add(event.timeEnd.split(":")[0], "hours")
  //       .add(event.timeEnd.split(":")[1], "minutes")
  //       .valueOf(),
  //   },
  // }))
  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {},
      rows: GSTC.api.fromArray(rowsFromDB), // rows: generateRows(),
    },
    chart: {
      config: {
        // innerHeight: 700,
      },
      time: {
        // from: date("2020-01-01").valueOf(), // from 2020-01-01
        // to: date("2020-01-01").endOf("day").valueOf(), // to 2020-01-31
        zoom: 16.05,
        onLevelDates: [({ dates }) => dates],
        onCurrentViewLevelDates: [({ dates }) => dates],
        onDate: [({ date }) => date],
      },
      items: GSTC.api.fromArray(items),
    },
  };

  state = GSTC.api.stateFromConfig(config);

  gstc = GSTC({
    element,
    state,
  });
}

const Gantt = () => {
  const ref = useRef(null);
  useEffect(() => {
    let savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    const colors = [
      "#E74C3C",
      "#DA3C78",
      "#7E349D",
      "#0077C0",
      "#07ABA0",
      "#0EAC51",
      "#F1892D",
    ];
    function getRandomColor() {
      return colors[Math.floor(Math.random() * colors.length)];
    }
    initializeGSTC(
      ref.current,
      savedEvents.map((event) => ({
        id: event.id,
        label: event.name,
        description: event.description,
        style: { background: getRandomColor() },
        rowId: "1",
        height: 300,
        time: {
          start: moment(event.date)
            .startOf("day")
            .add(event.timeStart.split(":")[0], "hours")
            .add(event.timeStart.split(":")[1], "minutes")
            .valueOf(),
          end: moment(event.date)
            .startOf("day")
            .add(event.timeEnd.split(":")[0], "hours")
            .add(event.timeEnd.split(":")[1], "minutes")
            .valueOf(),
        },
      }))
    );
    const interval = setInterval(() => {
      const savedEventsNew =
        JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
      if (!arraysEqual(savedEvents, savedEventsNew)) {
        savedEvents = savedEventsNew;
        initializeGSTC(
          ref.current,
          savedEvents.map((event) => ({
            id: event.id,
            label: event.name,
            description: event.description,
            style: { background: getRandomColor() },
            rowId: "1",
            height: 300,
            time: {
              start: moment(event.date)
                .startOf("day")
                .add(event.timeStart.split(":")[0], "hours")
                .add(event.timeStart.split(":")[1], "minutes")
                .valueOf(),
              end: moment(event.date)
                .startOf("day")
                .add(event.timeEnd.split(":")[0], "hours")
                .add(event.timeEnd.split(":")[1], "minutes")
                .valueOf(),
            },
          }))
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ref.current]);

  // useEffect(() => {
  //   return () => {
  //     if (gstc) {
  //       gstc.destroy();
  //     }
  //   };
  // });

  return (
    <div className="container">
      <hr />
      <div id="gstc" ref={ref}></div>

      {/* <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
          color: #2c3e50;
          font-size: 11px;
          margin-top: 2px;
          color: #fffffff0;
          line-height: 1em;
        }
        * {
          box-sizing: border-box;
        }
      `}</style> */}
    </div>
  );

  return (content) =>
    html`<div
        class="item-image"
        style="background:url(${imageSrc}),transparent;flex-shrink:0;border-radius:100%;width:34px;height:34px;vertical-align: middle;background-size: 100%;margin: 4px 11px 0px 0px;"
      ></div>
      <div class="item-text">
        <div class="item-label">${content}</div>
        <div
          class="item-description"
          style="font-size:11px;margin-top:2px;color:#fffffff0;line-height:1em;"
        >
          ${description}
        </div>
      </div>`;
};

export default Gantt;

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
