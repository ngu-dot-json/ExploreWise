import React, { useCallback, useEffect } from "react";
import "gantt-schedule-timeline-calendar/dist/style.css";

let GSTC, gstc, state;

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

  const rowsFromDB = [
    {
      id: "1",
      label: "Row 1",
      height: 400,
    },
  ];

  const config = {
    // bruh
    licenseKey:
      "====BEGIN LICENSE KEY====\nLu0QIexdRxqrRDxH8OvaAOQVGMblYKmaHhQG3uVSy6fzNO53M5eOM8DJRWLBoITGEzYR6Es/gTWtsTqAt81YQib8GBH3Sl+0suMwXGGfzoZFBLJgaOssiFKtjDk9NyI8WvPK/yvfmlj/vbmQ0/w3/jjPsfGAaUPviHmx1gc/hwnrTRAilwYQIW6l2h4vnmASjCdoA+XlI5kFbpbCUPLn8KISP1EsgX/k9DHG8+lRp2Q+8tnJScRatyPrfJxtfWO2Dc7sY851TPSLu+v7UQytNwbZ/j00F0yOzqSgEEClWtBg2wWo4AXDrT7e4Z2OgfgGNzpYNnazgAeLTcGL/uWlNg==||U2FsdGVkX1+91qiAaPx9v46wtBNz4mq+A7M6ttO/gWnY9aPoNPQdD+mzJ8Sia91Z6K1tc8ms2uv5IWFDv00bU2y9P/w2Tt21FYgekZnCUhQ=\nUWNYcEpBsSzusnL1CtYRX1hLP1gnCJQEjGtHumezJFz10uktm5KKYMR4L49/y4uRCR3Umjrah1xmCSi5+JWIZ1Umd+X1bIwJdxM+X5XODhXzf10Ykd3QJcmLdw+UZ8eaTXOY+nGCjCaOpg3Z93+jMe0uptC9fwsiAVGhL8QX7cyZEJM3SxuLzwyKj8qDuWxSwi4Ie+lZNBND98tmBz/WxMk5a8Y5FEQn+C6ipVBn+vczdREXjiocsRtgni6MzICeOubtQi7907y+EAJhaCv/vP/xERwA1ZTIiBmiYN/m3j1j+Z9TjKR949YkKiBF12H+bE1chUjBKArOC32U3IbfIQ==\n====END LICENSE KEY====",
    innerHeight: 560,
    width: 500,
    headerHeight: 50,
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {},
      rows: GSTC.api.fromArray(rowsFromDB), // rows: generateRows(),
    },
    chart: {
      time: {
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
        height: 130,
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

  return (
    <div className="container">
      <hr />
      <div id="gstc" ref={ref}></div>
    </div>
  );
};

export default Gantt;
