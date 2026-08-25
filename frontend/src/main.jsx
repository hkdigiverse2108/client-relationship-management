// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// // import './index.css'
// import App from './App.jsx'


// import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.bundle.min.js";



// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>
// )



import React from "react";
import ReactDOM from "react-dom/client";
// Bootstrap first so our custom styles can override it.
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/variables.css";
import "@/styles/themes.css";
import "@/styles/global.css";
import App from "./App";

  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
