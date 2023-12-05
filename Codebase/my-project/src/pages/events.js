import Navbar from "../../components/Navbar";
import React, { useEffect, useState } from "react";
import { EVENTS } from "../../constants/events";
import { BiSolidDownArrow } from "react-icons/bi";
import Gantt from "../../components/gantt-small";
import Image from 'next/image'
import backgrounder from "/public/test.png"
import TwoButtons from "../../components/TwoButtons"

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [activeEvent, setActiveEvent] = useState(-1);
  const [sortingOption, setSortingOption] = useState("default"); // default sorting option
  const [genreOption, setGenreOption] = useState("default");
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    setSavedEvents(savedEvents);

    let filteredEvents = EVENTS.filter(
      (event) => !savedEvents.find((e) => e.id === event.id)
    );

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
        // Only display events related to art & creativity
        filteredEvents = filteredEvents.filter(
          (event) => event.genre.toLowerCase() === "art & creativity"
        );
        // Add more conditions for other genres as needed
      }
    }

    // Sorting logic based on the selected option
    if (sortingOption === "date") {
      filteredEvents = filteredEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
    } else if (sortingOption === "lowprice") {
      filteredEvents = filteredEvents.sort((a, b) => a.price - b.price);
    } else if (sortingOption === "highprice") {
      filteredEvents = filteredEvents.sort((a, b) => b.price - a.price);
    }

    if (showRecommended) {
      filteredEvents = filteredEvents.filter(
        (event) => event.recommended === "recommended"
      );
    }

    setEvents(filteredEvents);
    setActiveEvent(0);
  }, [sortingOption, genreOption, showRecommended]);

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

  const toggleFavorite = (clickedEvent) => {
    const updatedEvents = events.map((event) =>
      event.id === clickedEvent.id
        ? { ...event, favorite: !event.favorite }
        : event
    );

    setEvents(updatedEvents);
  };

  return (
    <>
      <div>
        <Navbar />
      </div>

      <div className="flex flex-col w-full pt-28 px-8 h-full gap-4">
        <div className="flex gap-4 w-full h-full">
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

              <button
                className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
                OnClick
              >
                Favourites ♥
              </button>
              <button
                className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowRecommended(!showRecommended)}
              >
                User Recommended
              </button>
            </div>
            <div className="flex flex-col border-2 p-4 h-full gap-2 rounded">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="flex border-2 border-ewBlue p-2 gap-2 hover:bg-slate-200 hover:scale-105 text-black rounded"
                  onMouseEnter={() => setActiveEvent(index)}
                >
                  <div className="flex flex-col w-1/2">
                    <p className="font-bold text-xl" title={"hiiiiii"}>
                      {event.name}
                    </p>
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
                    <button className="" onClick={() => toggleFavorite(event)}>
                      {/* ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~ */}
                      {event.favorite ? "♥" : "♡"}
                    </button>

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
          </div>
          {/* the right column */}
          <div className="flex flex-col w-1/3 h-80">
            <div style={{ marginBottom: "2rem" }}>
              {events[activeEvent]?.imgURL && (
                <img
                  src={events[activeEvent]?.imgURL}
                  className="h-full w-full bg-cover"
                />
              )}
              {events.length === 0 && <p>No events available.</p>}
            </div>
            <div className="flex flex-col gap-4">
              <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl text-ewOrange">
                <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
                  Attractions, activities, and experiences
                </span>{" "}
              </h1>
              <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
                Discover new attractions and experiences to match your interests
                and travel style
              </p>
            </div>
          </div>
        </div>
      </div>`
        </div>
        <div className="">
          <Gantt />
          <TwoButtons />
        </div>
      </main>
    </>
  );
}

export default FindEvents;
