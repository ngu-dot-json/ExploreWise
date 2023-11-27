import dynamic from "next/dynamic";

const Map = dynamic(() => import('./leafMap'), {
    ssr: false
});

export default Map