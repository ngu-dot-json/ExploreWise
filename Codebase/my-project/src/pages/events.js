import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import TwoButtons from "../../components/TwoButtons";
import Gantt from "../../components/gantt-events";
import { EVENTS } from "../../constants/events";
import { IoChevronDown } from "react-icons/io5";
import Head from "next/head";


const objectsEqual = (o1, o2) =>
  typeof o1 === "object" && Object.keys(o1).length > 0
    ? Object.keys(o1).length === Object.keys(o2).length &&
      Object.keys(o1).every((p) => objectsEqual(o1[p], o2[p]))
    : o1 === o2;
const arraysEqual = (a1, a2) =>
  a1.length === a2.length && a1.every((o, idx) => objectsEqual(o, a2[idx]));

function FindEvents() {
  const [events, setEvents] = useState([]);
  const [savedEvents, setSavedEvents] = useState([]);
  const [sortingOption, setSortingOption] = useState("default"); // default sorting option
  const [genreOption, setGenreOption] = useState("default");
  const [showRecommended, setShowRecommended] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [timer, setTimer] = useState(0);
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("data") ?? "{}");
    const savedEvents = data.events ?? [];
    setSavedEvents(savedEvents);
    setEvents(
      EVENTS.map((e) =>
        data.favorites?.find((ev) => ev.id === e.id)
          ? { ...e, favorite: true }
          : e
      )
        .filter(
          (event) =>
            !savedEvents.find((e) => e.id === event.id) &&
            (genreOption === "default" ||
              event.genre.toLowerCase() === genreOption) &&
            (!showRecommended || event.recommended) &&
            (!showFavorites || event.favorite)
        )
        .sort((a, b) => {
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
        })
    );
  }, [sortingOption, genreOption, showRecommended, showFavorites, timer]);

  const addEvent = (event) => {
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data") ?? "{}"),
        events: [...savedEvents, event],
      })
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
    localStorage.setItem(
      "data",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("data") ?? "{}"),
        favorites: [...updatedEvents.filter((e) => e.favorite)],
      })
    );
    setEvents(updatedEvents);
  };

  return (
    <>
      <Head>
        <title>ExploreWise: Events</title>
      </Head>

      <div>
        <Navbar />
      </div>
      <div className="flex flex-col w-full pt-28 px-8 h-full gap-4">
        {popup !== null && (
          <div className="bg-white shadow-md p-4 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] text-black ">
            <p className="font-bold">{popup.title}</p>
            <p>{popup.message}</p>
            <div className="flex gap-4 w-full">
              <button
                className="flex relative justify-between px-4 appearance-none items-center group bg-white border-2 border-orange-500  hover:border-orange-700 text-black font-bold w-full py-2 rounded"
                onClick={() => popup.cancel?.()}
              >
                {popup.cancelText ?? "Cancel"}
              </button>
              <button
                className="flex relative justify-between px-4 appearance-none items-center group bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                onClick={() => popup.confirm?.()}
              >
                {popup.confirmText ?? "Confirm"}
              </button>
            </div>
          </div>
        )}{" "}
        <Gantt setPopup={(p) => setPopup(p)} />
        <div className="flex gap-4 w-full h-full justify-center items-start">
          <div className="flex flex-col gap-4 h-full ">
            <div className="flex w-screen px-4 h-full justify-between items-start gap-4">
              <div className="flex flex-col gap-4 justify-start items-start w-1/5">
                <p className="font-bold text-xl">Filters</p>
                <div className="flex relative justify-between px-4 appearance-none items-center group bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-2 rounded">
                  <select
                    value={sortingOption}
                    onChange={handleSortingChange}
                    className="appearance-none bg-orange-600 outline-none group-hover:bg-orange-700 text-white font-bold w-full"
                  >
                    <option value="default">Sort By</option>
                    <option value="price-ASC">Price Low to High</option>
                    <option value="price-DESC">Price High to Low</option>
                    <option value="date-DESC">Oldest to Newest</option>
                    <option value="date-ASC">Newest to Oldest</option>
                  </select>
                  <IoChevronDown className="top-1/2 right-4 absolute -translate-y-1/2 text-white" />
                </div>
                <div className="flex relative justify-between px-4 appearance-none items-center group bg-orange-600 hover:bg-orange-700 hover:bg-bg-orange-700 text-white font-bold w-full py-2 rounded">
                  <select
                    value={genreOption}
                    onChange={handleGenreChange}
                    className="appearance-none bg-orange-600 outline-none group-hover:bg-orange-700 text-white font-bold w-full"
                  >
                    <option value="default">Genre</option>
                    <option value="music">Music</option>
                    <option value="food">Food</option>
                    <option value="outdoorsy">Outdoorsy</option>
                    <option value="art & creativity">Art & Creativity</option>
                  </select>
                  <IoChevronDown className="top-1/2 right-4 absolute -translate-y-1/2 text-white" />
                </div>
                <button
                  onClick={() => setShowFavorites(!showFavorites)}
                  className="flex relative justify-between px-4 appearance-none items-center group bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                >
                  Favourites
                  <p className="top-1/2 right-4 absolute -translate-y-1/2 text-white">
                    ♥
                  </p>
                </button>
                <button
                  className="flex relative justify-between px-4 appearance-none items-center group bg-orange-600 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                  onClick={() => setShowRecommended(!showRecommended)}
                >
                  User Recommended
                </button>
              </div>
              <div className="w-4/5 flex flex-col gap-4 items-start justify-start">
                <p className="font-bold text-xl">Events</p>
                <div className="grid grid-cols-4 grid-flow-rows gap-2">
                  {events.map((event) => {
                    return (
                      <div
                        key={event.id}
                        className="flex flex-col bg-blue-100 border-3 border-gray-900 items-start justify-start rounded-md w-full h-full relative"
                      >
                        <div className="w-full min-h-[45%] relative">
                          <div className="w-full h-full">
                            <img
                              src={event.imgURL}
                              alt={event.name}
                              className="rounded-md rounded-b-none brightness-90 object-fit aspect-[4/3] w-full h-full"
                            />
                          </div>
                          <button
                            className="absolute top-4 text-red-500 text-4xl right-4"
                            onClick={() => toggleFavorite(event)}
                          >
                            {event.favorite ? "♥" : "♡"}
                          </button>
                          <button
                            className="absolute border-2 border-gray-900 bottom-4 right-4 text-sm font-bold py-2 bg-green-600 rounded-md w-1/3 text-white hover:bg-orange-700"
                            onClick={() => addEvent(event)}
                          >
                            Add Event
                          </button>

                          <p className="absolute border-2 border-gray-900 top-4 left-4 bg-green-100 w-20 py-2 text-center text-black font-bold rounded-md">
                          {event.price === 0 ? "FREE" : `$${event.price}`}                          </p>
                        </div>

                        <div className="flex flex-col text-white w-full h-full p-2 rounded-md">
                          <div className="flex justify-between items-start gap-2">
                            <p className="font-bold text-orange-600 text-xl">{event.name}</p>
                          </div>
                          <p className="font-bold text-black">
                            {new Date(event.date).toLocaleDateString("en", {
                              dateStyle: "medium",
                            })}{" "}
                            at {event.timeStart} until {event.timeEnd}
                          </p>
                          <p className="font-light text-black text-sm">
                            {event.description}
                          </p>
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
