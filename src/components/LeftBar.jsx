import { Sidebar } from "flowbite-react";
import { HiChartPie, HiViewBoards } from "react-icons/hi";

const LeftBar = () => {
  return (
    <div
      className="bg-slate-800 shadow-inner"
      style={{
        float: "left",
        maxWidth: "20%",
        height: "100%",
      }}
    >
      <Sidebar aria-label="Sidebar with multi-level dropdown example">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              {/* <Sidebar.Collapse icon={HiChartPie} label="Dashboard">
                 adding more options. 
                <Sidebar.Item href="/">Heatmap</Sidebar.Item>
              </Sidebar.Collapse> */}

              <Sidebar.Item href="/" icon={HiViewBoards}>
                Dashboard
              </Sidebar.Item>
            </div>

            <div className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
              <Sidebar.Item href="/report" icon={HiViewBoards}>
                Report
              </Sidebar.Item>
            </div>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </div>
  );
};

export default LeftBar;
