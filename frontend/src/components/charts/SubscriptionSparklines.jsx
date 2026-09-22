import React from 'react';
import ReactApexChart from 'react-apexcharts';

const createSparklineOptions = (color) => ({
  chart: {
    type: 'area',
    sparkline: { enabled: true },
    animations: { 
      enabled: true, 
      easing: 'easeinout', 
      speed: 800,
      animateGradually: {
          enabled: true,
          delay: 150
      },
      dynamicAnimation: {
          enabled: true,
          speed: 350
      }
    }
  },
  colors: [color],
  stroke: {
    curve: 'straight',
    width: 2,
  },
  fill: {
    type: 'solid',
    opacity: 0.2,
  },
  tooltip: {
    fixed: { enabled: false },
    x: { show: false },
    y: {
      title: { formatter: function () { return '' } }
    },
    marker: { show: false }
  }
});

const data = [6, 2, 8, 4, 3, 8, 1, 3, 6, 5, 9, 2, 8, 1, 4, 8, 9, 8, 2, 1];

export const Sparkline1 = () => (
  <ReactApexChart options={createSparklineOptions('#F7A37A')} series={[{ data }]} type="area" height={45} width="100%" />
);

export const Sparkline2 = () => (
  <ReactApexChart options={createSparklineOptions('#70B1FF')} series={[{ data }]} type="area" height={45} width="100%" />
);

export const Sparkline3 = () => (
  <ReactApexChart options={createSparklineOptions('#60DD97')} series={[{ data }]} type="area" height={45} width="100%" />
);

export const Sparkline4 = () => (
  <ReactApexChart options={createSparklineOptions('#DE5555')} series={[{ data }]} type="area" height={45} width="100%" />
);
