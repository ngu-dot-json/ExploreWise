import { Inter } from "next/font/google";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import Gantt from "../../components/gantt-maxsize";
const inter = Inter({ subsets: ["latin"] });
import Head from "next/head";

function itinerary() {
  const [popup, setPopup] = useState(null);
  return (
    <>
      <Head>
        <title>ExploreWise: Itinerary</title>
      </Head>
      <div>
        <Navbar />
        <br />
      </div>

      {/* background image container */}
      <main className="flex flex-col w-full h-full gap-4">
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
                className="flex relative justify-between px-4 appearance-none items-center group bg-orange-500 hover:bg-orange-700 text-white font-bold w-full py-2 rounded"
                onClick={() => popup.confirm?.()}
              >
                {popup.confirmText ?? "Confirm"}
              </button>
            </div>
          </div>
        )}
        <div className="gantt-center">
          <Gantt setPopup={(p) => setPopup(p)} popup={popup} />
        </div>
      </main>
    </>
  );
}
export default itinerary;
