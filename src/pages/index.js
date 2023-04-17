import * as React from "react";
import { useState } from "react";
import { Switch } from "@headlessui/react";
import Map from "../mapComponents/map";
import { RadioGroup } from "@headlessui/react";
import { Sidebar } from "flowbite-react";
import logo from "./Logo.svg";
import Image from "next/image";
import { HiChartPie, HiViewBoards } from "react-icons/hi";
import { OverviewTotalProfit } from "../cards/overview-total-profit";
import { OverviewTotalCustomers } from "../cards/overview-total-customers";
import { OverviewTasksProgress } from "../cards/overview-tasks-progress";
import { OverviewBudget } from "../cards/overview-budget";

const plans = [
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
  const [selected, setSelected] = useState(plans[0]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700 drop-shadow-xl">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="" className="flex ml-2 md:mr-24">
                <Image src={logo} height={35} />
                <span className="self-center font-[Verdana] text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white"></span>
              </a>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      HKT Strategy Manager
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      john@pccw-hkt.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Dashboard
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Earnings
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="auto-cols-auto">
        <aside
          id="logo-sidebar"
          className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <Sidebar aria-label="Sidebar with multi-level dropdown example">
            <Sidebar.Items>
              <Sidebar.ItemGroup>
                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Sidebar.Collapse icon={HiChartPie} label="Dashboard">
                    <Sidebar.Item href="#">Map options here?</Sidebar.Item>
                  </Sidebar.Collapse>
                </div>

                <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Sidebar.Item href="#" icon={HiViewBoards}>
                    Report
                  </Sidebar.Item>
                </div>
              </Sidebar.ItemGroup>
            </Sidebar.Items>
          </Sidebar>
        </aside>

        <aside
          id="logo-sidebar"
          className="flex flex-col fixed top-0 right-0 z-40 w-70 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
          aria-label="Sidebar"
        >
          <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
            <ul className="space-y-2 font-medium">
              <li>
                <div className="flex pl-3 items-center justify-self-center gap-3">
                  <Switch
                    checked={enabled}
                    onChange={setEnabled}
                    className={`${enabled ? "bg-sky-900" : "bg-sky-700"}
          relative inline-flex h-[30px] w-[56px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                  >
                    <span
                      aria-hidden="true"
                      className={`${enabled ? "translate-x-7" : "translate-x-0"}
            pointer-events-none inline-block h-[26px] w-[26px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                  </Switch>
                  <span className="">Toggle heatmap</span>
                </div>
              </li>
            </ul>
            <div className="w-full px-4 py-6">
              <div className="mx-auto w-full max-w-md">
                <RadioGroup value={selected} onChange={setSelected}>
                  <RadioGroup.Label className="sr-only">
                    Server size
                  </RadioGroup.Label>
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
                    relative flex cursor-pointer rounded-lg px-5 py-3 shadow-md focus:outline-none focus:ring-0 focus:ring-offset-0`
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
            <div className="flex flex-col gap-y-4 box-border ">
              <OverviewTotalProfit />
              <OverviewTotalCustomers />
              <OverviewTasksProgress />
              <OverviewBudget />
            </div>
          </div>
        </aside>

        {/* <div className="p-4 sm:ml-64 relative v-screen h-screen"> */}
        <div className="mapbox__content">
          <Map isOn={enabled} />
        </div>
        {/* </div> */}
      </div>
    </>
  );
}

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
