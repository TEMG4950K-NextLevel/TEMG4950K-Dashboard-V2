import * as React from "react";

// to import google font
import Head from "next/head";

// react hooks and mui
import { useState, useEffect, useMemo } from "react";
import { Box } from "@mui/system";

// components
import TopNav from "./TopNav";
import LeftBar from "../components/LeftBar";
import RightBar from "../components/RightBar";
import Map from "../mapComponents/Map";
import TimeSliders from "../components/TimeSliders";
import SettingModal from "../components/SettingModal";
import LaunchModal from "../components/LaunchModal";


function filterFeaturesByDay(featureCollection, time) {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  const features = featureCollection.features.filter((feature) => {
    const featureDate = new Date(feature.properties.time);
    return (
      featureDate.getFullYear() === year &&
      featureDate.getMonth() === month &&
      featureDate.getDate() === day
    );
  });
  return { type: "FeatureCollection", features };
}

export const plans = [
  {
    name: "Income heatmap",
  },
  {
    name: "Age heatmap",
  },
  {
    name: "Gender heatmap",
  },
];

export default function App() {
  const [enabled, setEnabled] = useState(true);
  const [isToggled, setIsToggled] = useState(false);

  const [isClicked, setIsClicked] = useState(false);

  const [modalIsOpen,setModalIsOpen]=useState(false);
  const [launchIsOpen,setLaunchIsOpen]=useState(false);


  const handleLaunchOpen = ()=>{
    setLaunchIsOpen(true);
    console.log("clicked");
  }

  const handleModalOpen = ()=>{
    setModalIsOpen(true);
    console.log("clicked");
  }

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log("isclicked");
  };

  // TODO: get it back
  const handleToggleClick = () => {
    setIsToggled(!isToggled); //flip heatmap
  };

  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);

  useEffect(() => {
    /* global fetch */
    fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
      .then((resp) => resp.json())
      .then((json) => {
        // Note: In a real application you would do a validation of JSON data before doing anything with it,
        // but for demonstration purposes we ingore this part here and just trying to select needed data...
        const features = json.features;
        const endTime = features[0].properties.time;
        const startTime = features[features.length - 1].properties.time;

        setTimeRange([startTime, endTime]);
        setEarthQuakes(json);
        selectTime(endTime);
      })
      .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return allDays
      ? earthquakes
      : filterFeaturesByDay(earthquakes, selectedTime);
  }, [earthquakes, allDays, selectedTime]);

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>
      {/* global box */}
      <Box
        className="bg-slate-800"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <SettingModal modalIsopen={modalIsOpen} onClose={()=>setModalIsOpen(false)}/>
        <LaunchModal launchIsOpen={launchIsOpen} onClose={()=>setLaunchIsOpen(false)}/>
        <TopNav />
        <Box
          sx={{
            flex: "1 0 auto",
            maxHeight: "calc(100% - 64px)",
          }}
        >
          <LeftBar handleModalOpen={handleModalOpen} handleLaunchOpen={handleLaunchOpen}/>
          {/* Map page, hide if report page */}
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                position: "relative",
                width: "100%",
                height: "100%",
              }}
            >
              {/* data, timeRange, selectedTime, allDays, selectTime, useAllDays */}
          
              <Map data={data} isClicked={isClicked} />
              <RightBar handleClick={handleClick} />
            </Box>
            <Box sx={{ display: "flex", height: "30%" }}>
              <TimeSliders
                startTime={timeRange[0]}
                endTime={timeRange[1]}
                selectedTime={selectedTime}
                allDays={allDays}
                onChangeTime={selectTime}
                onChangeAllDays={useAllDays}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
