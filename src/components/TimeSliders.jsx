import { Slider } from "antd";
import { useState, useMemo } from "react";

import * as React from "react";

function formatTime(time) {
  const date = new Date(time);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
}

const marks = {
  0: {
    style: {
      color: "white",
    },
    label: "Mon",
  },
  1: {
    style: {
      color: "white",
    },
    label: "Tue",
  },
  2: {
    style: {
      color: "white",
    },
    label: "Wed",
  },
  3: {
    style: {
      color: "white",
    },
    label: "Thur",
  },
  4: {
    style: {
      color: "white",
    },
    label: "Fri",
  },
  5: {
    style: {
      color: "white",
    },
    label: "Sat",
  },
  6: {
    style: {
      color: "white",
    },
    label: "Sun",
  },
};

const marksHours = {
  0: {
    style: {
      color: "white",
    },
    label: "1 am",
  },
  6: {
    style: {
      color: "white",
    },
    label: "6 am",
  },
  12: {
    style: {
      color: "white",
    },
    label: "Noon",
  },
  18: {
    style: {
      color: "white",
    },
    label: "6pm",
  },
  23: {
    style: {
      color: "white",
    },
    label: "12pm",
  },
};

const fakeMarkHours = {
  0: {
    style: {
      color: "white",
    },
    label: "12am",
  },

  15: {
    style: {
      color: "white",
    },
    label: "noon",
  },

  30: {
    style: {
      color: "white",
    },
    label: "12am",
  },
}

function TotalFootTraffic(props) {
  const [radius, setRadius] = useState(0);

  const {
    startTime,
    endTime,
    onChangeTime,
    allDays,
    onChangeAllDays,
    selectedTime,
  } = props;

  const day = 24 * 60 * 60 * 1000;
  const days = Math.round((endTime - startTime) / day);
  const selectedDay = Math.round((selectedTime - startTime) / day);

  const onSelectDay = (evt) => {
    const daysToAdd = evt;
    // add selected days to start time to calculate new time
    const newTime = startTime + daysToAdd * day;
    onChangeTime(newTime);
  };

  return (
    <div
      className="bg-slate-800 shadow-inner"
      style={{
        height: "100%",
        width: "75%",
        display: "inline-block",
      }}
    >
      <div className="flex flex-col items-center gap-1 mt-1">
        <div className="">Weekday</div>
        <div className="w-[90%] bg-gray-800 rounded-[30px] px-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Slider
            min={0}
            max={6}
            defaultValue={radius}
            step={1}
            marks={marks}
            trackStyle={{
              backgroundColor: "#3730a3",
            }}
            railStyle={{
              backgroundColor: "#475569",
            }}
            handleStyle={{
              backgroundColor: "#a78bfa",
            }}
            tooltipVisible={false}
            onChange={(value) => {
              setRadius(value);
            }}
          />
        </div>
        <hr></hr>
        <div className="flex items-center gap-x-2">
          <span>Time of Day</span> (<label>All Days</label>
          <input
            type="checkbox"
            name="allday"
            checked={allDays}
            onChange={(evt) => onChangeAllDays(evt.target.checked)}
          />
          )
        </div>
        <div className="w-[90%] bg-gray-800 rounded-[30px] px-10 shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
          <Slider
            max={days}
            value={selectedDay}
            disabled={allDays}
            step={1}
            trackStyle={{
              backgroundColor: "#db2777",
            }}
            railStyle={{
              backgroundColor: "#475569",
            }}
            handleStyle={{
              backgroundColor: "#e879f9",
            }}
            marks={fakeMarkHours}
            tooltipVisible={false}
            onChange={(value) => {
              onSelectDay(value);
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default React.memo(TotalFootTraffic);
