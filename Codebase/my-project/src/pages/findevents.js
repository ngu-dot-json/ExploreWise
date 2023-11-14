import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { EVENTS } from "../../constants/events";
import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { BiSolidDownArrow } from "react-icons/bi";
import Schedule from "../../components/TLScheduler_old";

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(-1);
  useEffect(() => {
    setEvents(EVENTS);
    setActiveEvent(0);
  }, []);
  return (
    <div>
      <Navbar />

      <div id="root" className="flex flex-col w-full pt-28 px-8 h-full gap-4">
        <div className="flex gap-4 w-full h-full">
          {/* the left column */}
          <div className="flex flex-col w-2/3 gap-4 h-full">
            <div className="flex gap-4">
              <button className="px-2 py-1 border-2 border-black hover:bg-black hover:text-white flex gap-2 items-center">
                Sorting <BiSolidDownArrow />
              </button>
              <button className="px-2 py-1 border-2 border-black hover:bg-black hover:text-white flex gap-2 items-center">
                Genre <BiSolidDownArrow />
              </button>
              <button className="px-2 py-1 border-2 border-black hover:bg-black hover:text-white">
                <VscHeartFilled />
              </button>
              <button className="px-2 py-1 border-2 border-black hover:bg-black hover:text-white">
                User rec
              </button>
            </div>
            <div className="flex flex-col border-2 p-4 border-black overflow-hidden overflow-y-scroll h-full gap-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex border-2 border-black p-2 gap-2"
                >
                  <div className="flex flex-col w-1/2">
                    <p className="font-bold text-xl">{event.name}</p>
                    <p className="font-light text-sm">{event.description}</p>
                  </div>
                  <div className="flex flex-col w-1/4 gap-4">
                    <p>
                      {event.dates
                        .map((date) =>
                          new Date(date).toLocaleDateString("en", {
                            dateStyle: "medium",
                          })
                        )
                        .join(" - ")}
                    </p>
                    <p>{event.times.join(" - ")}</p>
                  </div>
                  <div className="flex w-1/4 items-center content-between gap-2">
                    <button className="">
                      {event.favorite ? <VscHeartFilled /> : <VscHeart />}
                    </button>
                    <div>
                      <p className="font-bold text-md">Price: {event.price}</p>
                      <button className="text-md px-2 py-1 border-2 border-black hover:bg-black hover:text-white">
                        Add event
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* the right column */}
          <div className="flex flex-col w-1/3">
            <img
              src={events[activeEvent]?.imgURL}
              className="h-full w-full bg-cover"
            />
          </div>
        </div>
        {/* <Schedule /> */}
      </div>
    </div>
  );
}

export default FindEvents;
