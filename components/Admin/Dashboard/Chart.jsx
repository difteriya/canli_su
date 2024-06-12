import React, { useState, useMemo, useEffect } from "react";
import Chart from "react-apexcharts";
import { format, endOfMonth, startOfMonth } from "date-fns";

const ChartWidget = ({ orders }) => {
  // const result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
  const [categories, setCategories] = useState([]);
  const [series, setSeries] = useState(() => [
    {
      name: "Total",
      data: []
    }
  ]);

  useEffect(() => {
    const endDay = format(new Date(), "d");
    const firstDay = format(startOfMonth(new Date()), "d");
    console.log("--start");

    const mo = {};
    orders.map((o) => {
      let d = format(new Date(o.createdAt), "d");
      if (mo[d]) {
        mo[d] = mo[d] + o.total;
      } else {
        mo[d] = o.total;
      }
    });
    const xcat = [];
    const xser = [];
    for (let i = firstDay; i <= endDay; i++) {
      let d = i.toString();
      if (mo[d]) {
        xcat.push(d);
        xser.push(mo[d]);
      }
    }
    setCategories(xcat);
    setSeries([
      {
        data: xser
      }
    ]);
  }, [orders]);

  return (
    <div>
      <Chart
        options={{
          chart: {
            type: "area",
            fontFamily: "Inter, sans-serif",
            foreColor: "#6B7280",
            toolbar: {
              show: false
            },
            height: 300,
            zoom: {
              enabled: false
            }
          },
          dataLabels: {
            enabled: false
          },
          xaxis: {
            categories: categories
          }
        }}
        series={series}
        type="area"
        width="100%"
      />
    </div>
  );
};

export default ChartWidget;
