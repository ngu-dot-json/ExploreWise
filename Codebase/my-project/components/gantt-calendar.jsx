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
      height: 50,
    },
  ];

  const config = {
    licenseKey:
      "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
    plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
    list: {
      columns: {},
      rows: GSTC.api.fromArray(rows),
    },
    actions: {
      "chart-timeline-items-row-item": [handleClick],
    },
    innerHeight: 90,
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

const Gantt = ({ setPopup }) => {
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
      height: 60,
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
          style: { background: colors[id] },
          rowId: "1",
          height: 30,
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
      {events.length >= 1 && (
        <p className="font-bold text-black">Click on an event to delete it.</p>
      )}
      {events.length === 0 && (
        <p className="font-bold text-black">No events in itinerary...</p>
      )}
      <div id="gstc" ref={ref}></div>
    </div>
  );
};

export default Gantt;
