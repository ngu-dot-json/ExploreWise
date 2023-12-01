import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { EVENTS } from "../../constants/events";
// import { VscHeartFilled, VscHeart } from "react-icons/vsc";
import { BiSolidDownArrow } from "react-icons/bi";
import Gantt from "../../components/gantt-calendar";

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(-1);
  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    setSavedEvents(savedEvents);
    setEvents(
      EVENTS.filter((event) => !savedEvents.find((e) => e.id === event.id))
    );
    setActiveEvent(0);
  }, []);

  const addEvent = (event) => {
    localStorage.setItem(
      "data",
      JSON.stringify({ events: [...savedEvents, event] })
    );
    setSavedEvents([...savedEvents, event]);
    setEvents(events.filter((e) => e.id !== event.id));
    setActiveEvent(0);
  };

  return (
    <>
      <div>
        <Navbar />
        <br />
      </div>

      <div id="root" className="flex flex-col w-full pt-28 px-8 h-full gap-4">
        <div className="flex gap-4 w-full h-full">
          {/* the left column */}
          <div className="flex flex-col w-2/3 gap-4 h-full ">
            <div className="flex gap-4">
              {/* Make into DropDown menu */}
              <button className="flex items-center bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                Sort By <BiSolidDownArrow className="ml-2" />
              </button>

              {/* Make into DropDown menu */}
              <button className="flex items-center bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                Genre
                <BiSolidDownArrow className="ml-2" />
              </button>

              <button className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                Favourites ♥
              </button>
              <button className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                User Recommended
              </button>
            </div>
            <div className="flex flex-col border-2 p-4 border-black overflow-hidden overflow-y-scroll h-full gap-2">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex border-2 border-black p-2 gap-2 text-black"
                  onMouseEnter={() => setActiveEvent(index)}
                >
                  <div className="flex flex-col w-1/2">
                    <p className="font-bold text-xl">{event.name}</p>
                    <p className="font-light text-sm">{event.description}</p>
                  </div>
                  <div className="flex flex-col w-1/4 gap-4">
                    <p>
                      {new Date(event.date).toLocaleDateString("en", {
                        dateStyle: "medium",
                      })}
                    </p>
                    <p>
                      {event.timeStart} - {event.timeEnd}
                    </p>
                  </div>
                  <div className="flex w-1/4 items-center content-between gap-2">
                    <button className="">{event.favorite ? "♥" : "♡"}</button>
                    <div>
                      <p className="font-bold text-md">Price: {event.price}</p>
                      {!savedEvents.find((e) => e.id === event.id) ? (
                        <button
                          className="text-md px-2 py-1 border-2 border-black hover:bg-black hover:text-white"
                          onClick={() => addEvent(event)}
                        >
                          Add event
                        </button>
                      ) : (
                        <button className="text-md px-2 py-1 border-2 border-black bg-black text-white cursor-not-allowed">
                          Event added
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              {events.length === 0 && <p>No events available.</p>}
            </div>
            <div className="">
              <Gantt />
            </div>
          </div>
          {/* the right column */}
          <div className="flex flex-col w-1/3 h-80">
            {events[activeEvent]?.imgURL && (
              <img
                src={events[activeEvent]?.imgURL}
                className="h-full w-full bg-cover"
              />
            )}
            {events.length === 0 && <p>No events available.</p>}
          </div>
        </div>
      </div>
    </>
  );
}

export default FindEvents;
