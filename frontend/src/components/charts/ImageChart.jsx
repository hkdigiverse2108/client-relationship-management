import React, { useEffect, useRef, useState } from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, LineController, Tooltip, Legend);

const ImageChart = ({ 
  id = "imageChart", 
  data: propData, 
  labels: propLabels, 
  imageUrls: propImageUrls,
  initials: propInitials,
  overdueData
}) => {
  const canvasRef = useRef(null);
  const chartInstance = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const preloadedImages = useRef([]);
  const [primaryColor, setPrimaryColor] = useState('#ff6c2f');

  const defaultImageUrls = [
    '/assets/img/users/user-01.jpg',
    '/assets/img/users/user-05.jpg',
    '/assets/img/users/user-03.jpg',
    '/assets/img/users/user-04.jpg',
    '/assets/img/users/user-02.jpg',
    '/assets/img/users/user-06.jpg',
    '/assets/img/users/user-07.jpg',
    '/assets/img/users/user-08.jpg',
    '/assets/img/users/user-30.jpg',
    '/assets/img/users/user-27.jpg',
  ];
  const defaultLabels = ['Micheal', 'Martinz', 'Clark', 'Hensrita', 'Lisa', 'Davis', 'Anderson', 'James', 'Merkel', 'Daniel'];
  const defaultInitials = ['MI', 'MA', 'CL', 'HE', 'LI', 'DA', 'AN', 'JA', 'ME', 'DA'];
  const defaultData = [4, 7, 2, 5, 3, 8, 1, 6, 2, 4];

  const imageUrls = propImageUrls || defaultImageUrls;
  const labels = propLabels || defaultLabels;
  const data = propData || defaultData;
  const initials = propInitials || defaultInitials;

  useEffect(() => {
    let loadedCount = 0;
    preloadedImages.current = new Array(imageUrls.length);

    if (imageUrls.length === 0) {
      setImagesLoaded(true);
      return;
    }

    imageUrls.forEach((url, index) => {
      if (!url) {
        loadedCount++;
        if (loadedCount === imageUrls.length) setImagesLoaded(true);
        return;
      }
      const img = new Image();
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      img.onerror = () => {
        loadedCount++;
        if (loadedCount === imageUrls.length) {
          setImagesLoaded(true);
        }
      };
      preloadedImages.current[index] = img;
    });

    const updatePrimaryColor = () => {
      const dummy = document.createElement('div');
      dummy.className = 'text-primary';
      dummy.style.display = 'none';
      document.body.appendChild(dummy);
      const computedColor = getComputedStyle(dummy).color;
      if (computedColor) {
        setPrimaryColor(computedColor);
      }
      document.body.removeChild(dummy);
    };

    updatePrimaryColor();

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'data-color') {
          updatePrimaryColor();
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });

    return () => {
      observer.disconnect();
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [imageUrls]);

  useEffect(() => {
    if (!imagesLoaded || !canvasRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const imageLabelsPlugin = {
      id: 'imageLabels',
      afterDraw(chart) {
        const { ctx, chartArea: { bottom }, scales: { x } } = chart;
        ctx.save();

        imageUrls.forEach((_, index) => {
          const image = preloadedImages.current[index];
          const xPos = x.getPixelForValue(index);
          const imageSize = 24;
          const imageY = bottom + 10;
          const radius = imageSize / 2;
          const centerX = xPos;
          const centerY = imageY + radius;

          if (image && image.complete && image.naturalWidth > 0) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.clip();
            ctx.drawImage(image, xPos - radius, imageY, imageSize, imageSize);
            ctx.restore();
          } else {
            const initial = initials[index] || labels[index]?.substring(0, 2).toUpperCase() || 'U';
            
            ctx.save();
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = primaryColor; // Dynamic Primary theme color
            ctx.fill();
            
            ctx.fillStyle = '#ffffff';
            ctx.font = '10px Inter';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(initial, centerX, centerY);
            ctx.restore();
          }

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.stroke();
          ctx.closePath();
        });
        ctx.restore();
      }
    };

    const verticalLinesPlugin = {
      id: 'verticalLines',
      afterDatasetsDraw(chart) {
        const { ctx, scales: { x, y } } = chart;
        ctx.save();
        ctx.strokeStyle = '#B9CBD1';
        ctx.lineWidth = 6;
        const offset = 2;

        for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
          const xPos = x.getPixelForValue(i);
          const yPos = y.getPixelForValue(chart.data.datasets[0].data[i]);
          ctx.beginPath();
          ctx.moveTo(xPos, yPos + offset);
          ctx.lineTo(xPos, y.getPixelForValue(0));
          ctx.stroke();
        }
        ctx.restore();
      }
    };

    const config = {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Projects',
          data: data,
          pointBackgroundColor: '#0C4B5E',
          pointBorderColor: '#fff',
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
          showLine: false,
        }]
      },
      options: {
        responsive: true, 
        maintainAspectRatio: false,
        layout: { padding: { top: 10, bottom: 25, } },
        scales: {
          y: { min: 0, max: 10, ticks: { stepSize: 2, color: '#9CA3AF' }, grid: { color: '#F3F4F6' } },
          x: { grid: { display: false }, ticks: { display: false } }
        },
        plugins: { 
          legend: { display: false }, 
          tooltip: { 
            enabled: true,
            callbacks: {
              label: function(context) {
                const total = context.raw;
                const idx = context.dataIndex;
                const overdue = (overdueData && overdueData[idx]) ? overdueData[idx] : 0;
                return [
                  `Total Projects: ${total}`,
                  `Overdue: ${overdue}`
                ];
              }
            }
          } 
        }
      },
      plugins: [imageLabelsPlugin, verticalLinesPlugin]
    };

    chartInstance.current = new ChartJS(canvasRef.current, config);

  }, [imagesLoaded, data, primaryColor, overdueData]);

  return (
    <div style={{ height: '250px' }}>
      <canvas ref={canvasRef} id={id}></canvas>
    </div>
  );
};

export default ImageChart;
