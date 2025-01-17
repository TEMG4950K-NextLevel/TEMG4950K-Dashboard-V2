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
import top from '../mapComponents/top.json';

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

function filterFeaturesByWeekday(featureCollection, selectedTime) {

  const features = featureCollection.features.filter((feature) => {

    return (
      feature.properties.time === selectedTime 
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
  const [selectedTime, setSelectedTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.16937091366327,
            22.32037282822013
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.16975968322646,
            22.320412587510035
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.169265418404,
            22.320661986433336
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.16955650717398,
            22.320755962724448
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.16958385779571,
            22.3206222272145
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 1
        },
        "geometry": {
          "coordinates": [
            114.16957213609982,
            22.32047584090266
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.1693904498232,
            22.320748733780945
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.1693142588017,
            22.320511985685272
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.16937482089526,
            22.32067644432898
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.16948422338442,
            22.320652950248714
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.1694744553065,
            22.320511985685272
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 2
        },
        "geometry": {
          "coordinates": [
            114.16937482089526,
            22.320611383789668
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16949399146438,
            22.320434274390735
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16946664084259,
            22.320846324482062
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16918344215946,
            22.320779888313865
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16944178634736,
            22.320812877310814
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16926823611112,
            22.32058635270826
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 3
        },
        "geometry": {
          "coordinates": [
            114.16961454411665,
            22.320546765847183
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 4
        },
        "geometry": {
          "coordinates": [
            114.16939186093623,
            22.320546032757036
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 4
        },
        "geometry": {
          "coordinates": [
            114.16932212385501,
            22.32044193391866
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 4
        },
        "geometry": {
          "coordinates": [
            114.16958680777793,
            22.32072124118929
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 4
        },
        "geometry": {
          "coordinates": [
            114.16946952268614,
            22.320739568418546
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 4
        },
        "geometry": {
          "coordinates": [
            114.16953925976736,
            22.320562160739073
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 5
        },
        "geometry": {
          "coordinates": [
            114.16937918146795,
            22.320491050985737
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 5
        },
        "geometry": {
          "coordinates": [
            114.16966367706095,
            22.32069484997531
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 5
        },
        "geometry": {
          "coordinates": [
            114.16964386538916,
            22.320457328822073
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 5
        },
        "geometry": {
          "coordinates": [
            114.16931974645439,
            22.320735169883548
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 5
        },
        "geometry": {
          "coordinates": [
            114.16952261796479,
            22.3207051132256
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 6
        },
        "geometry": {
          "coordinates": [
            114.16924525457199,
            22.320724906635462
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 6
        },
        "geometry": {
          "coordinates": [
            114.16931736905377,
            22.320607612314674
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 6
        },
        "geometry": {
          "coordinates": [
            114.169502806293,
            22.320609078494343
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 6
        },
        "geometry": {
          "coordinates": [
            114.169574128308,
            22.320685319812952
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 6
        },
        "geometry": {
          "coordinates": [
            114.16939186093623,
            22.320449997916313
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 0
        },
        "geometry": {
          "coordinates": [
            114.16929993478425,
            22.320804080246106
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 0
        },
        "geometry": {
          "coordinates": [
            114.16941801234299,
            22.32066406021916
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 0
        },
        "geometry": {
          "coordinates": [
            114.16953925976736,
            22.320521840780103
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {
          "time": 0
        },
        "geometry": {
          "coordinates": [
            114.16955273170413,
            22.320413343379315
          ],
          "type": "Point"
        }
      },
      {
        "type": "Feature",
        "properties": {"time": 0},
        "geometry": {
          "coordinates": [
            114.1692436696398,
            22.320546032757036
          ],
          "type": "Point"
        }
      }
    ]
  }

  useEffect(() => {
    setEarthQuakes(geojson);
    /* global fetch */
    // fetch("https://docs.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson")
    //   .then((resp) => resp.json())
    //   .then((json) => {
    //     // Note: In a real application you would do a validation of JSON data before doing anything with it,
    //     // but for demonstration purposes we ingore this part here and just trying to select needed data...
    //     const features = json.features;
    //     const endTime = features[0].properties.time;
    //     const startTime = features[features.length - 1].properties.time;

    //     setTimeRange([startTime, endTime]);
    //     setEarthQuakes(geojson);
    //     selectTime(endTime);
    //   })
    //   .catch((err) => console.error("Could not load data", err)); // eslint-disable-line
  }, []);

  const data = useMemo(() => {
    return allDays
      ? earthquakes
      : filterFeaturesByWeekday(earthquakes, selectedTime);
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
          
              <Map selectedTime={selectedTime} data={data} isClicked={isClicked} />
              <RightBar handleClick={handleClick} />
            </Box>
            <Box sx={{ display: "flex", height: "30%" }}>
              <TimeSliders
                setSelectedTime={setSelectedTime}
                allDays={allDays}
                onChangeAllDays={useAllDays}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}
