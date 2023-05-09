// most of the features in this file were referenced from 
// https://visgl.github.io/react-map-gl/examples
import * as React from "react";
import { useState, useMemo, useEffect, useCallback } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import GeocoderControl from "./geocoder-control";
import { Slider } from "antd";
import { Box } from "@mui/system";

import DrawControl from "./draw-control";

import ContextMenu from "./context-menu";
import Image from "next/image";

// hardcoded images
import impression from "./impression.jpeg";
import revenue from "./revenue.jpeg";
import male from "./male.jpeg";
import female from './female.jpeg';

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

// token is NOT linked with any billing account
const TOKEN =
  "pk.eyJ1Ijoic29rdTE3IiwiYSI6ImNsZ2pjb3F2dDBtNWgzY212N21oMTR6dzkifQ.lPPlfpBi6oq78d8-_Gm0cA"; // Set your mapbox token here

export default function Map({ selectedTime ,isClicked, isToggled ,data}) {
  const [features, setFeatures] = useState({});

  const onUpdate = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        newFeatures[f.id] = f;
      }
      return newFeatures;
    });
  }, []);

  const onDelete = useCallback((e) => {
    setFeatures((currFeatures) => {
      const newFeatures = { ...currFeatures };
      for (const f of e.features) {
        delete newFeatures[f.id];
      }
      return newFeatures;
    });
  }, []);

  const [popupInfo, setPopupInfo] = useState(null);
  const [intensity, setIntensity] = useState(0.1);
  const [radius, setRadius] = useState(11);
  const [markerCoords, setMarkerCoords] = useState([]);

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
          latitude: 22.3193,
          longitude: 114.1694,
          zoom: 9,
          bearing: 0,
          pitch: 0,
        }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={TOKEN}
      >

        {/* draw geofence ref code: https://visgl.github.io/react-map-gl/examples/draw-polygon */}
        <DrawControl
          position="top-left"
          displayControlsDefault={false}
          controls={{
            polygon: true,
            trash: true,
          }}
          defaultMode="draw_polygon"
          onCreate={onUpdate}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />

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

          {/* markers ref code: https://visgl.github.io/react-map-gl/examples/controls */}
        {markerCoords.map((coords, index) => (
          <Marker
            key={index}
            longitude={coords.longitude}
            latitude={coords.latitude}
            onClick={(e) => {
              // If we let the click event propagates to the map, it will immediately close the popup
              // with `closeOnClick: true`
              e.originalEvent.stopPropagation();
              setPopupInfo(city);
            }}
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

        {/* heatmap ref code: https://visgl.github.io/react-map-gl/examples/heatmap */}
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

        <Marker
          key={`marker-top`}
          longitude={114.16944105056365}
          latitude={22.320593420763686}
          anchor="bottom"
          onClick={(e) => { 
            // If we let the click event propagates to the map, it will immediately close the popup
            // with `closeOnClick: true`
            e.originalEvent.stopPropagation();
            setPopupInfo({"city":"New York","population":"8,175,133","image":"http://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Above_Gotham.jpg/240px-Above_Gotham.jpg",
            "state":"New York","latitude":22.3206,"longitude":114.1694},);
          }}
        >
          <Billboard />
        </Marker>


        {popupInfo && (
          <Popup
            anchor="top"
            longitude={Number(popupInfo.longitude)}
            latitude={Number(popupInfo.latitude)}
            onClose={() => setPopupInfo(null)}
          >
            {/* <img width="100%" src={popupInfo.image} /> */}
            {(selectedTime<3)&& <Image src={male} width="200" height="200" alt="male" />}
            {(selectedTime>=3)&&<Image src={female} width="200" height="200" alt="female" />}
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
