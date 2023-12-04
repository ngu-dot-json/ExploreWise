import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { EVENTS } from "../../constants/events";
import { BiSolidDownArrow } from "react-icons/bi";
import Gantt from "../../components/gantt-calendar";
import Image from 'next/image'
import backgrounder from "/public/test.png"

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(-1);
  const [sortingOption, setSortingOption] = useState("default"); // default sorting option
  const [genreOption, setGenreOption] = useState("default");

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    setSavedEvents(savedEvents);

    let sortedEvents = EVENTS.filter(
      (event) => !savedEvents.find((e) => e.id === event.id)
    );
    let filteredEvents = EVENTS.filter(
      (event) => !savedEvents.find((e) => e.id === event.id)
    );

    // Sorting logic based on the selected option
    if (sortingOption === "date") {
      sortedEvents = sortedEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (sortingOption === "lowprice") {
      sortedEvents = sortedEvents.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "highprice") {
      sortedEvents = sortedEvents.sort((a, b) => b.price - a.price);
    }

    // Genre filtering logic
    if (genreOption !== "default") {
      // Hard-coded logic for specific events based on the selected genre
      if (genreOption === "music") {
        // Only display events related to music
        filteredEvents = filteredEvents.filter(
          (event) => event.genre.toLowerCase() === "music"
        );
      } else if (genreOption === "food") {
        // Only display events related to food
        filteredEvents = filteredEvents.filter(
          (event) => event.genre.toLowerCase() === "food"
        );
      } else if (genreOption === "outdoorsy") {
        // Only display events related to outdoorsy activities
        filteredEvents = filteredEvents.filter(
          (event) => event.genre.toLowerCase() === "outdoorsy"
        );
      } else if (genreOption === "art & creativity") {
        // Only display events related to outdoorsy activities
        filteredEvents = filteredEvents.filter(
          (event) => event.genre.toLowerCase() === "art & creativity"
        );
        // Add more conditions for other genres as needed
      }
    }

    setEvents(sortedEvents);
    setEvents(filteredEvents);
    setActiveEvent(0);
  }, [sortingOption, genreOption]);

  const addEvent = (event) => {
    localStorage.setItem(
      "data",
      JSON.stringify({ events: [...savedEvents, event] })
    );
    setSavedEvents([...savedEvents, event]);
    setEvents(events.filter((e) => e.id !== event.id));
    setActiveEvent(0);
  };

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
    // Add logic to sort events based on the selected option
    // You might need to update the EVENTS array or use a sorting function
  };

  const handleGenreChange = (e) => {
    setGenreOption(e.target.value);
    // Add logic to sort events based on the selected option
    // You might need to update the EVENTS array or use a sorting function
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <main className="flex flex-col items-center justify-between">
        <div className='relative w-full'>
          <div className='absolute -z-10 mt-[-25px] w-full h-full'>
            <Image className="bImg" src={backgrounder} alt="background image" width={1000} height={1000}/>
          </div>

          <div id="root" className="flex flex-col w-full pt-14 px-8 h-full gap-4">
`        <div className="flex gap-4 w-full h-full">
          {/* the left column */}
          <div className="flex flex-col w-2/3 gap-4 h-full ">
            <div className="flex gap-4">
              {/* Make into DropDown menu */}
              <select
                value={sortingOption}
                onChange={handleSortingChange}
                className="flex items-center bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
              >
                <option value="default">Sort By</option>
                <option value="lowprice">Price Low to High</option>
                <option value="highprice">Price High to Low</option>
                <option value="date">Date</option>
              </select>

              {/* Make into DropDown menu */}
              <select
                value={genreOption}
                onChange={handleGenreChange}
                className="flex items-center bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
              >
                <option value="default">Genre</option>
                <option value="music">Music</option>
                <option value="food">Food</option>
                <option value="outdoorsy">Outdoorsy</option>
                <option value="art & creativity">Art & Creativity</option>
              </select>

              <button className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                Favourites ♥
              </button>
              <button className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded">
                User Recommended
              </button>
            </div>
            <div className="flex flex-col border-2 p-4 border-black bg-white overflow-hidden overflow-y-auto max-h-screen gap-2" style={{ maxHeight: '55vh', overflowY: 'scroll' }}>
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
          <div className="flex flex-col w-1/3 h-96 pt-16">
            {events[activeEvent]?.imgURL && (
              <img
                src={events[activeEvent]?.imgURL}
                className="h-full w-full bg-cover"
              />
            )}
            {events.length === 0 && <p>No events available.</p>}
          </div>
        </div>
      </div>`
        </div>
      </main>
    </>
  );
}

export default FindEvents;
