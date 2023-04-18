import * as React from "react";
import {
  useState,
  useMemo,
  useEffect,
} from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GeocoderControl from "./geocoder-control";
import { Slider } from "antd";

import ContextMenu from "./context-menu";

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

import Pin from "./pin";
import { Billboard } from "./pin";

import CITIES from "./cities.json";

const TOKEN =
  "pk.eyJ1Ijoic29rdTE3IiwiYSI6ImNsZ2pjb3F2dDBtNWgzY212N21oMTR6dzkifQ.lPPlfpBi6oq78d8-_Gm0cA"; // Set your mapbox token here

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

export default function Map({ isToggled }) {
  const [popupInfo, setPopupInfo] = useState(null);
  const [allDays, useAllDays] = useState(true);
  const [timeRange, setTimeRange] = useState([0, 0]);
  const [selectedTime, selectTime] = useState(0);
  const [earthquakes, setEarthQuakes] = useState(null);
  const [intensity, setIntensity] = useState(0.1);
  const [weight, setWeight] = useState(2);
  const [radius, setRadius] = useState(11);

  const [markerCoords, setMarkerCoords] = useState([]);

  //probably some state to trigger the right modal?
  let [isOpen, setIsOpen] = useState(true);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

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
          <Pin />
        </Marker>
      )),
    []
  );

  return (
    <div>
      <div className="mapbox__container">
        <MapGL
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
          {pins}

          {popupInfo && (
            <Popup
              anchor="top"
              longitude={Number(popupInfo.longitude)}
              latitude={Number(popupInfo.latitude)}
              onClose={() => setPopupInfo(null)}
            >
              <div>
                {popupInfo.city}, {popupInfo.state} |{" "}
                <a
                  target="_new"
                  href={`http://en.wikipedia.org/w/index.php?title=Special:Search&search=${popupInfo.city}, ${popupInfo.state}`}
                >
                  Wikipedia
                </a>
              </div>
              <img width="100%" src={popupInfo.image} />
            </Popup>
          )}
        </MapGL>

        <ControlPanel
          startTime={timeRange[0]}
          endTime={timeRange[1]}
          selectedTime={selectedTime}
          allDays={allDays}
          onChangeTime={selectTime}
          onChangeAllDays={useAllDays}
        />

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
      </div>
    </div>
  );
}
