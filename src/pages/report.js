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
import Link from "next/link";
import ReportComponent from "../reportComponents/reportComponent";
import LeftBar from "../components/LeftBar";
import { Box } from "@mui/system";
import TopNav from "./TopNav";

export default function Report() {
  return (
    <>
      <Box
        className="bg-slate-800"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <TopNav />
        <Box
          sx={{
            flex: "1 0 auto",
            maxHeight: "calc(100% - 64px)",
          }}
        >
          <LeftBar />
          {/* Map page, hide if report page */}
          <Box
            sx={{ display: "flex", flexDirection: "column", height: "100%" }}
          >
            <Box
              sx={{
                display: "flex",
                flexGrow: 1,
                position: "relative",
                width: "75%",
                height: "100%",
              }}
            >
              <ReportComponent />
            </Box>
          </Box>
        </Box>
      </Box>
      {/* <div className="p-4 sm:ml-64 relative v-screen h-screen"> */}
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
