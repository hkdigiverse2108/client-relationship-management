// Central Chart.js registration. Import this once in charts index to avoid
// duplicate side-effect imports across the app.
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler } from "chart.js";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, Filler);
export { ChartJS };
