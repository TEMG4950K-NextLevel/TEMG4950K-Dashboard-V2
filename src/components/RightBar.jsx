import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { Tab } from "@headlessui/react";
import Form from "../mapComponents/RangeForm";

import Chart from "./Chart";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const plans = [
  {
    name: "Foot traffic heatmap",
  },
  {
    name: "Income heatmap",
  },
  {
    name: "Age heatmap",
  },
];

const labels = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];

const RightBar = ({ handleClick }) => {
  const [selected, setSelected] = useState(plans[0]);
  let [categories] = useState({
    Heatmaps: [{}, {}],
    Parameters: [{}, {}],
    Metrics: [{}, {}],
  });
  return (
    <div
      className="bg-slate-800 bg-gradient-to-r from-slate-800 to-gray-800 shadow-inner p-4 overflow-auto"
      style={{
        position: "absolute",
        right: "0",
        width: "25%",
        height: "calc(595.39px + 178.61px)",
      }}
    >
      <div className="w-full max-w-md px-2 sm:px-0">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            {Object.keys(categories).map((category) => (
              <Tab
                key={category}
                className={({ selected }) =>
                  classNames(
                    "w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700",
                    "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2",
                    selected
                      ? "bg-white shadow"
                      : "text-blue-100 hover:bg-white/[0.12] hover:text-white"
                  )
                }
              >
                {category}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            <Tab.Panel
              className={classNames(
                "rounded-xl bg-gray-800 shadow-[rgba(0,_0,_0,_0.35)_0px_4px_7px]",
                "ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2"
              )}
            >
              <div className="w-full px-4 py-4">
                <div className="mx-auto w-full max-w-md">
                  <RadioGroup value={selected} onChange={setSelected}>
                    <div className="space-y-2">
                      {plans.map((plan) => (
                        <RadioGroup.Option
                          key={plan.name}
                          value={plan}
                          className={({ active, checked }) =>
                            `${
                              active
                                ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-sky-300"
                                : ""
                            }
                  ${
                    checked ? "bg-sky-900 bg-opacity-75 text-white" : "bg-white"
                  }
                    relative flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                          }
                        >
                          {({ active, checked }) => (
                            <>
                              <div className="flex w-full items-center justify-between">
                                <div className="flex items-center">
                                  <div className="text-sm">
                                    <RadioGroup.Label
                                      as="p"
                                      className={`font-medium  ${
                                        checked ? "text-white" : "text-gray-900"
                                      }`}
                                    >
                                      {plan.name}
                                    </RadioGroup.Label>
                                  </div>
                                </div>
                                {checked && (
                                  <div className="shrink-0 text-white">
                                    <CheckIcon className="h-6 w-6" />
                                  </div>
                                )}
                              </div>
                            </>
                          )}
                        </RadioGroup.Option>
                      ))}
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </Tab.Panel>
            <Tab.Panel>
              <Form handleClick={handleClick} />
            </Tab.Panel>
            <Tab.Panel>
              <div className="flex flex-col mt-2 gap-y-4 box-border ">
                <Chart
                  dataLabel={"Cost by day"}
                  labels={labels}
                  title="Total cost estimate"
                  value="$120,421"
                />
                <Chart
                  dataLabel={"Impressions by day"}
                  labels={labels}
                  title="Total traffic reached"
                  value="124,643"
                />
                <Chart
                  dataLabel={"Correlation by day"}
                  labels={labels}
                  title="Overall correlation"
                  value="0.62"
                />
              </div>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};

export default RightBar;

function CheckIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx={12} cy={12} r={12} fill="#fff" opacity="0.2" />
      <path
        d="M7 13l3 3 7-7"
        stroke="#fff"
        strokeWidth={1.5}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
