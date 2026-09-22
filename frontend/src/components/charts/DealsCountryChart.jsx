import React, { useRef, useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const DealsCountryChart = ({ data, color }) => {
  const containerRef = useRef(null);
  const [width, setWidth] = useState(150);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(entries => {
      for (const entry of entries) {
        setWidth(Math.floor(entry.contentRect.width));
      }
    });
    observer.observe(el);
    setWidth(el.offsetWidth || 150);
    return () => observer.disconnect();
  }, []);

  const series = [{ data: data }];
  const options = {
    chart: { type: 'line', sparkline: { enabled: true }, animations: { enabled: false } },
    stroke: { curve: 'smooth', width: 2 },
    colors: [color],
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      y: { title: { formatter: () => '' } },
      marker: { show: false }
    }
  };

  return (
    <div ref={containerRef} style={{ width: '100%', overflow: 'visible' }}>
      <ReactApexChart options={options} series={series} type="line" height={35} width={width || 150} />
    </div>
  );
};

export default DealsCountryChart;
