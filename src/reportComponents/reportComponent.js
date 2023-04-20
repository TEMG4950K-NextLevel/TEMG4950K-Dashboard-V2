import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

function ReportComponent() {
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("in TestBackend.useEffect");
    fetch("http://127.0.0.1:5000/report")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        console.log("in TestBackend.data");
        console.log(data);
      });
  }, []);

  const columns = [
    { field: "id", headerName: "Object ID", width: 100 },
    { field: "facility_name", headerName: "Facility Name", width: 350 },
    { field: "district", headerName: "District", width: 200 },
    { field: "latitude", headerName: "Latitude", width: 150 },
    { field: "longitude", headerName: "Longitude", width: 150 },
    { field: "website", headerName: "Website", width: 600 },
  ];

  const rows = data.map((item) => {
    return {
      id: item.ObjectId,
      facility_name: item.Facility_Name,
      district: item.District,
      latitude: item.Latitude,
      longitude: item.Longitude,
      website: item.Website,
    };
  });

  return (
    <DataGrid
      sx={{
        color: "white",
        boxShadow: 2,
        border: 2,
        borderColor: "primary.light",
        "& .MuiDataGrid-cell:hover": {
          color: "white",
        },
        maxWidth: "calc(100vw - 256px)",
      }}
      rows={rows}
      columns={columns}
      pageSize={20}
      rowsPerPageOptions={[10, 20, 50]}
      slots={{ toolbar: GridToolbar }}
      initialState={{
        sorting: {
          sortModel: [{ field: "id", sort: "asc" }],
        },
      }}
    />
  );
}

export default ReportComponent;
