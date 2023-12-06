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

const colors = [
  "#E74C3C",
  "#DA3C78",
  "#7E349D",
  "#0077C0",
  "#07ABA0",
  "#0EAC51",
  "#F1892D",
];

async function initializeGSTC(element, items, handleClick) {
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

  const rows = [
    {
      id: "1",
      label: "Row 1",
      height: 480,
    },
  ];

  const config = {
    licenseKey: "====BEGIN LICENSE KEY====\nLu0QIexdRxqrRDxH8OvaAOQVGMblYKmaHhQG3uVSy6fzNO53M5eOM8DJRWLBoITGEzYR6Es/gTWtsTqAt81YQib8GBH3Sl+0suMwXGGfzoZFBLJgaOssiFKtjDk9NyI8WvPK/yvfmlj/vbmQ0/w3/jjPsfGAaUPviHmx1gc/hwnrTRAilwYQIW6l2h4vnmASjCdoA+XlI5kFbpbCUPLn8KISP1EsgX/k9DHG8+lRp2Q+8tnJScRatyPrfJxtfWO2Dc7sY851TPSLu+v7UQytNwbZ/j00F0yOzqSgEEClWtBg2wWo4AXDrT7e4Z2OgfgGNzpYNnazgAeLTcGL/uWlNg==||U2FsdGVkX1+91qiAaPx9v46wtBNz4mq+A7M6ttO/gWnY9aPoNPQdD+mzJ8Sia91Z6K1tc8ms2uv5IWFDv00bU2y9P/w2Tt21FYgekZnCUhQ=\nUWNYcEpBsSzusnL1CtYRX1hLP1gnCJQEjGtHumezJFz10uktm5KKYMR4L49/y4uRCR3Umjrah1xmCSi5+JWIZ1Umd+X1bIwJdxM+X5XODhXzf10Ykd3QJcmLdw+UZ8eaTXOY+nGCjCaOpg3Z93+jMe0uptC9fwsiAVGhL8QX7cyZEJM3SxuLzwyKj8qDuWxSwi4Ie+lZNBND98tmBz/WxMk5a8Y5FEQn+C6ipVBn+vczdREXjiocsRtgni6MzICeOubtQi7907y+EAJhaCv/vP/xERwA1ZTIiBmiYN/m3j1j+Z9TjKR949YkKiBF12H+bE1chUjBKArOC32U3IbfIQ==\n====END LICENSE KEY====",
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {},
      rows: GSTC.api.fromArray(rows),
    },
    actions: {
      "chart-timeline-items-row-item": [handleClick],
    },
    innerHeight: 500,
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

const Gantt = ({ setPopup, popup }) => {
  const ref = useRef(null);
  const [events, setEvents] = useState([]);

  // const selectedItems
  const handleClick = (e, d) => {
    if (
      d.itemData.selected &&
      JSON.parse(localStorage.getItem("data") ?? "{}").events?.find(
        (e) => e.id === +d.itemData.id.split("-")[1]
      )
    ) {
      setPopup({
        title: "Delete Event",
        message: "Are you sure you want to delete this event?",
        confirmText: "Delete",
        cancel: () => setPopup(null),
        confirm: () => {
          const data = JSON.parse(localStorage.getItem("data") ?? "{}");
          localStorage.setItem(
            "data",
            JSON.stringify({
              ...data,
              events: [
                ...data.events?.filter(
                  (e) => e.id !== +d.itemData.id.split("-")[1]
                ),
              ],
            })
          );
          setPopup(null);
        },
      });
    }
  };
  useEffect(() => {
    let savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    const items = savedEvents.map((event) => ({
      id: event.id,
      label: event.name,
      description: event.description,
      style: { background: colors[event.id] },
      rowId: "1",
      height: 480,
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
    }));

    initializeGSTC(ref.current, items, handleClick);
    setEvents(items);
    const interval = setInterval(() => {
      const savedEventsNew =
        JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
      if (!arraysEqual(savedEvents, savedEventsNew)) {
        savedEvents = savedEventsNew;
        const itemsNew = savedEventsNew.map((event) => ({
          id: event.id,
          label: event.name,
          description: event.description,
          style: { background: colors[event.id] },
          rowId: "1",
          height: 480,
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
        }));
        initializeGSTC(ref.current, itemsNew, handleClick);
        setEvents(itemsNew);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [ref.current]);

  return (
    <div className="container">

      {events.length === 0 && (
        <p className="font-bold text-center text-sm text-orange-500">No events in itinerary. Add some events in the events page!</p>
        )}

      <div id="gstc" ref={ref}></div>

      {events.length >= 1 && (
        <p className="mt-[-5px] text-sm text-center text-red-500 ">Simply click on an event to access the delete function.</p>
      )}
    </div>
  );
};

export default Gantt;
