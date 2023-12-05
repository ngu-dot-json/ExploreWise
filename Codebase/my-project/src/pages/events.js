import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TwoButtons from "../../components/TwoButtons";
import Gantt from "../../components/gantt-small";
import { EVENTS } from "../../constants/events";
import { IoChevronDown } from "react-icons/io5";

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [sortingOption, setSortingOption] = useState("default"); // default sorting option
  const [genreOption, setGenreOption] = useState("default");
  const [showRecommended, setShowRecommended] = useState(false);

  useEffect(() => {
    const savedEvents =
      JSON.parse(localStorage.getItem("data") ?? "{}").events ?? [];
    setSavedEvents(savedEvents);

    let filteredEvents = EVENTS.filter(
      (event) =>
        !savedEvents.find((e) => e.id === event.id) &&
        (genreOption === "default" ||
          event.genre.toLowerCase() === genreOption) &&
        (!showRecommended || event.recommended)
    ).sort((a, b) => {
      switch (sortingOption) {
        case "date-ASC":
          return new Date(a.date) - new Date(b.date);
        case "date-DESC":
          return new Date(b.date) - new Date(a.date);
        case "price-ASC":
          return a.price - b.price;
        case "price-DESC":
          return b.price - a.price;
      }
      return 0;
    });

    // if (showRecommended) {
    //   filteredEvents = filteredEvents.filter(
    //     (event) => event.recommended === "recommended"
    //   );
    // }

    setEvents(filteredEvents);
  }, [sortingOption, genreOption, showRecommended]);

  const addEvent = (event) => {
    localStorage.setItem(
      "data",
      JSON.stringify({ events: [...savedEvents, event] })
    );
    setSavedEvents([...savedEvents, event]);
    setEvents(events.filter((e) => e.id !== event.id));
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
        <Gantt />
        <div className="flex gap-4 w-full h-full justify-center items-start">
          <div className="flex flex-col gap-4 h-full ">
            <div className="flex w-full h-full justify-between items-start gap-4">
              <div className="flex flex-col gap-4 justify-start items-start w-1/5">
                <p className="font-bold text-xl">Filters</p>
                <div className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 text-white font-bold w-full py-2 rounded">
                  <select
                    value={sortingOption}
                    onChange={handleSortingChange}
                    className="appearance-none bg-orange-500 outline-none group-hover:bg-orange-700 text-white font-bold w-full"
                  >
                    <option value="default">Sort By</option>
                    <option value="price-ASC">Price Low to High</option>
                    <option value="price-DESC">Price High to Low</option>
                    <option value="date-DESC">Oldest to Newest</option>
                    <option value="date-ASC">Newest to Oldest</option>
                  </select>
                  <IoChevronDown className="top-1/2 right-4 absolute -translate-y-1/2 text-white" />
                </div>
                <div className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 hover:bg-bg-orange-700 text-white font-bold w-full py-2 rounded">
                  <select
                    value={genreOption}
                    onChange={handleGenreChange}
                    className="appearance-none bg-orange-500 outline-none group-hover:bg-orange-700 text-white font-bold w-full"
                  >
                    <option value="default">Genre</option>
                    <option value="music">Music</option>
                    <option value="food">Food</option>
                    <option value="outdoorsy">Outdoorsy</option>
                    <option value="art & creativity">Art & Creativity</option>
                  </select>
                  <IoChevronDown className="top-1/2 right-4 absolute -translate-y-1/2 text-white" />
                </div>
                <button className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 text-white font-bold w-full py-2 rounded">
                  Favourites
                  <p className="top-1/2 right-4 absolute -translate-y-1/2 text-white">
                    ♥
                  </p>
                </button>
                <button
                  className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                  onClick={() => setShowRecommended(!showRecommended)}
                >
                  User Recommended
                </button>
              </div>
              <div className="w-4/5 flex flex-col gap-4 items-start justify-start h-full">
                <p className="font-bold text-xl">Events</p>
                <div className="grid grid-cols-3 grid-flow-rows gap-4 h-full">
                  {events.map((event) => {
                    return (
                      <div
                        key={event.id}
                        className="flex flex-col bg-black items-start justify-start rounded-md w-full h-full relative"
                      >
                        <img
                          src={event.imgURL}
                          alt={event.name}
                          className=" rounded-md rounded-b-none brightness-90 w-full"
                        />
                        <button
                          className="absolute top-4 text-white text-4xl right-4"
                          onClick={() => toggleFavorite(event)}
                        >
                          {event.favorite ? "♥" : "♡"}
                        </button>
                        <div className="flex flex-col text-white w-full h-full p-2 rounded-md">
                          <div className="flex justify-between items-start gap-2">
                            <p className="font-bold text-xl">{event.name}</p>
                            <p className="bg-orange-500 w-24 text-center rounded-md">
                              ${event.price}
                            </p>
                          </div>
                          <p className="font-light text-sm">
                            {event.description}
                          </p>
                          <p className="">
                            <strong>Date:</strong>{" "}
                            {new Date(event.date).toLocaleDateString("en", {
                              dateStyle: "medium",
                            })}
                          </p>
                          <p>
                            <strong>Time:</strong> {event.timeStart} -{" "}
                            {event.timeEnd}
                          </p>
                          <button
                            className="text-md py-1 bg-orange-500 rounded-sm w-1/2 ml-auto mt-auto text-white hover:bg-orange-700"
                            onClick={() => addEvent(event)}
                          >
                            Add event
                          </button>
                        </div>
                      </div>
                    );
                  })}
                  {events.length === 0 && <p>No events available.</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="">{/* <TwoButtons /> */}</div>
    </>
  );
}
/**
 * 
 *  <div className="flex gap-4">
              <select
                value={sortingOption}
                onChange={handleSortingChange}
                className="flex items-center bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
              >
                <option value="default">Sort By</option>
                <option value="price-ASC">Price Low to High</option>
                <option value="price-DESC">Price High to Low</option>
                <option value="date-DESC">Oldest to Newest</option>
                <option value="date-ASC">Newest to Oldest</option>
              </select>

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
              <button
                className="bg-ewBlue hover:bg-ewDarkBlue text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowRecommended(!showRecommended)}
              >
                User Recommended
              </button>
            </div>
 * <div className="flex flex-col gap-4">
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
 */
export default FindEvents;
