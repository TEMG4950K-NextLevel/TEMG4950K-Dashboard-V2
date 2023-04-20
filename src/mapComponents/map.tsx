import * as React from "react";
import { useState, useMemo, useEffect } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GeocoderControl from "./geocoder-control";
import { Slider } from "antd";
import { Box } from "@mui/system";

import ContextMenu from "./context-menu";
import Image from "next/image";

// hardcoded images
import impression from "./impression.jpeg";
import revenue from "./revenue.jpeg";

import MapGL, {
  Source,
  Layer,
  Marker,
  Popup,
  NavigationControl,
  FullscreenControl,
  ScaleControl,
  GeolocateControl,
} from "react-map-gl";
import ControlPanel from "./control-panel";
import { heatmapLayer } from "./map-style";

import { Billboard } from "./pin";
import CITIES from "./cities.json";

const TOKEN =
  "pk.eyJ1Ijoic29rdTE3IiwiYSI6ImNsZ2pjb3F2dDBtNWgzY212N21oMTR6dzkifQ.lPPlfpBi6oq78d8-_Gm0cA"; // Set your mapbox token here

export default function Map({ isClicked, isToggled, data }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [intensity, setIntensity] = useState(0.1);
  const [radius, setRadius] = useState(11);
  const [markerCoords, setMarkerCoords] = useState([]);

  // current clicking event (left click = add ,click delete = delete)
  //TODOS: right click trigger page , and add or delete by left click.
  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });
  const [isAddTriggered, setIsAddTriggered] = useState(false);
  const [isDeleteTriggered, setIsDeleteTriggered] = useState(false);

  const handleAddClick = () => {
    setIsAddTriggered(true);
    setClicked(false);
  };

  const handleDeleteClick = () => {
    setIsDeleteTriggered(true);
    setClicked(false);
  };

  const handleRightClick = (event) => {
    event.preventDefault();
    setClicked(true);
    setPoints({
      x: event.point.x,
      y: event.point.y,
    });
    console.log(
      "Right Click",
      event.originalEvent.pageX,
      event.originalEvent.pageY
    );
  };

  useEffect(() => {
    const handleClick = () => setClicked(false); // untoggle context menu when clicked
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  const handleMapClick = (event) => {
    if (!isAddTriggered) {
      return;
    }

    const longitude = event.lngLat["lng"];
    const latitude = event.lngLat["lat"];
    if (!isNaN(longitude) && !isNaN(latitude)) {
      const newMarkerCoords = {
        longitude,
        latitude,
      };
      setMarkerCoords([...markerCoords, newMarkerCoords]);
    }

    setIsAddTriggered(false);
  };

  const handleMarkerDelete = (index, event) => {
    if (!isDeleteTriggered) {
      return;
    }
    event.stopPropagation();
    const newMarkerCoords = [...markerCoords];
    newMarkerCoords.splice(index, 1);
    setMarkerCoords(newMarkerCoords);

    setIsDeleteTriggered(false);
  };

  const pins = useMemo(
    () =>
      CITIES.map((city, index) => (
        <Marker
          key={`marker-${index}`}
          longitude={city.longitude}
          latitude={city.latitude}
          anchor="bottom"
          onClick={(e) => {
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo(city);
          }}
        >
          <Billboard />
        </Marker>
      )),
    []
  );

  return (
    <Box
      className="shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px] z-10 mt-1"
      sx={{ height: "100%", width: "75%", position: "absolute" }}
    >
      {/* className="mapbox__container" */}
      <MapGL
        style={{ height: "100%", width: "100%", borderRadius: "15px" }}
        onClick={handleMapClick}
        onContextMenu={handleRightClick}
        initialViewState={{
          latitude: 40,
          longitude: -100,
          zoom: 3.5,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >
        {clicked && (
          <ContextMenu
            x={points.x}
            y={points.y}
            handleAddClick={handleAddClick}
            handleDeleteClick={handleDeleteClick}
          />
        )}
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-left" />
        <NavigationControl position="top-left" />
        <ScaleControl />

        {markerCoords.map((coords, index) => (
          <Marker
            key={index}
            longitude={coords.longitude}
            latitude={coords.latitude}
          >
            <Billboard />
            <button
              className="rounded-lg text-sky-950"
              onClick={(event) => handleMarkerDelete(index, event)}
            >
              {isDeleteTriggered && (
                <span className="text-sky-950">Delete</span>
              )}
            </button>
          </Marker>
        ))}

        {isToggled ||
          (data && (
            <Source type="geojson" data={data}>
              <Layer
                {...{
                  type: "heatmap",
                  paint: {
                    "heatmap-intensity": intensity,
                    "heatmap-radius": radius,
                    "heatmap-weight": [
                      "interpolate",
                      ["linear"],
                      ["get", "mag"],
                      0,
                      0,
                      6,
                      1,
                    ],
                    "heatmap-opacity": 1,
                    "heatmap-color": [
                      "interpolate",
                      ["linear"],
                      ["heatmap-density"],
                      0,
                      "rgba(33,102,172,0)",
                      0.2,
                      "rgb(103,169,207)",
                      0.4,
                      "rgb(209,229,240)",
                      0.6,
                      "rgb(253,219,199)",
                      0.8,
                      "rgb(239,138,98)",
                      0.9,
                      "rgb(255,201,101)",
                    ],
                  },
                }}
              />
            </Source>
          ))}
        <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
        {isClicked && pins}

        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            <div color="black">estimated</div>
            {/* <img width="100%" src={popupInfo.image} /> */}
            <Image src={revenue} width="200" height="200" alt="revenue" />
            <Image src={impression} width="200" height="200" alt="impression" />
          </Popup>
        )}
      </MapGL>

      <div className="mapbox__legend__range mr-[260px]">
        <div className="mapbox__legend__row">
          <label>
            <span>heatmap-intensity</span>
            <span>{intensity}</span>
          </label>
          <Slider
            min={0}
            max={2}
            defaultValue={intensity}
            tooltipVisible={false}
            step={0.1}
            onChange={(value) => {
              setIntensity(value);
            }}
          />
        </div>

        <div className="mapbox__legend__row">
          <label>
            <span>heatmap-radius</span>
            <span>{radius}</span>
          </label>
          <Slider
            min={0}
            max={20}
            defaultValue={radius}
            step={1}
            tooltipVisible={false}
            onChange={(value) => {
              setRadius(value);
            }}
          />
        </div>
      </div>
    </Box>
  );
}
